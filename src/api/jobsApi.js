import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
  addDoc,
  updateDoc,
  serverTimestamp,
  doc,
  getDoc,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const getAllJobs = async (pageSize, lastDoc, currentCycle = "") => {
  var Query;
  if(currentCycle=="all")
  {
    if (lastDoc) {
      Query = query(
        collection(db, "jobPostings"),
        orderBy("published", "desc"),
        limit(pageSize),
        startAfter(lastDoc)
      );
    } else {
      Query = query(
        collection(db, "jobPostings"),
        orderBy("published", "desc"),
        limit(pageSize)
      );
    }
  }
  else {if (lastDoc) {
    Query = query(
      collection(db, "jobPostings"),
      where("placementCycleId","==",currentCycle),
      orderBy("published", "desc"),
      limit(pageSize),
      startAfter(lastDoc)
    );
  } else {
    Query = query(
      collection(db, "jobPostings"),
      where("placementCycleId","==",currentCycle),
      orderBy("published", "desc"),
      limit(pageSize)
    );
  }
}
  const jobsList = [];
  const documentSnapshots = await getDocs(Query);
  documentSnapshots.docs.forEach((doc) => {
    
      jobsList.push(doc.data());
    
  });
  const response = {
    lastDoc: documentSnapshots.docs[documentSnapshots.docs.length - 1],
    jobsList: jobsList,
  };

  return response;
};

export const getJobs = async (pageSize, lastDoc, currentCycle) => {
  try {
    var Query;
    if(currentCycle == "all")
    {
      if (lastDoc) {
        Query = query(
          collection(db, "jobPostings"),
          orderBy("published", "desc"),
          limit(pageSize),
          startAfter(lastDoc),
        );
      } else {
        Query = query(
          collection(db, "jobPostings"),
          orderBy("published", "desc"),
          limit(pageSize),
        );
      }
    }
    else {
      if (lastDoc) {
        Query = query(
          collection(db, "jobPostings"),
          where("placementCycleId", "==", currentCycle),
          orderBy("published", "desc"),
          limit(pageSize),
          startAfter(lastDoc),
        );
      } else {
        Query = query(
          collection(db, "jobPostings"),
          where("placementCycleId", "==", currentCycle),
          orderBy("published", "desc"),
          limit(pageSize),
        );
      }
    }
    const jobsList = [];
    const documentSnapshots = await getDocs(Query);
    documentSnapshots.docs.forEach((doc) => {
      jobsList.push(doc.data());  
    });
    const response = {
      lastDoc: documentSnapshots.docs[documentSnapshots.docs.length - 1],
      jobsList: jobsList,
    };

    return response;
  } catch (e) {
    return e;
  }
};

export const getJobDetails = async (jobId) => {
  const docRef = doc(db, "jobPostings", jobId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    return "No such document!";
  }
};

export const createJobPosting = async (data, id) => {
  const docRef = await addDoc(collection(db, "jobPostings"), data);
  await updateDoc(docRef, {
    documentID: docRef.id,
    published: serverTimestamp(),
    placementCycleId: id,
  });

  const placeRef = doc(db, "placementCycle", id);
  const placeSnap = await getDoc(placeRef);
  const jobPosting = placeSnap.data()["jobPostings"];
  jobPosting.push(docRef.id);
  updateDoc(placeRef, { jobPostings: jobPosting });
};

export const listOfusersApplied = async (compId) => {
  // Previous implemented logic -> multiple backend calls
  // const jobRef = doc(db, "jobPostings", compId);
  // const jobSnap = await getDoc(jobRef);
  // const appliedUsers = jobSnap.data()["applications"];
  // const usersApplicant = [];
  // for (let i = 0; i < appliedUsers?.length; i++) {
  //   const docRef = doc(db, "users", appliedUsers[i].userId);
  //   const docSnap = await getDoc(docRef);
  //   const name = docSnap.data()["fullName"];
  //   const cgpa = docSnap.data()["cgpa"];
  //   const sid = docSnap.data()["SID"];
  //   const resume = appliedUsers[i].resume;
  //   console.log(resume);
  //   usersApplicant.push({
  //     name: name,
  //     resume: resume,
  //     cgpa: cgpa,
  //     SID: sid,
  //     id: appliedUsers[i].userId,
  //   });
  // }
  // return usersApplicant;


  // new logic -> only 2 backend calls
  var temp="statusListOfCompany."+compId;
  var Query = query(
    collection(db, "users"),
    where(temp, "==", "applied"),
  );
  const jobRef = doc(db, "jobPostings", compId);
  const jobSnap = await getDoc(jobRef);
  const appliedUsers = jobSnap.data()["applications"];
  const userSnap = await getDocs(Query);
  const applicants = [];
    userSnap.docs.forEach((doc) => {
      applicants.push(doc.data());
      applicants[applicants.length-1].id=doc.id;
      appliedUsers.forEach((user) => {
        if(user.userId == doc.id)
        {
          applicants[applicants.length-1].resume=user.resume;
        }
      })
    });
    return applicants;

};

export const listOfSelectedCandidates = async (compId) => {
  const jobRef = doc(db, "jobPostings", compId);
  const jobSnap = await getDoc(jobRef);
  const offeredUsersList = jobSnap.data()["selectedCandidates"];
  return offeredUsersList;
}

export const applyJobs = async (compId, resumeUrl) => {
  //users
  const auth = getAuth();
  const user = auth.currentUser;
  let docRef = doc(db, "users", user.uid);
  let docSnap = await getDoc(docRef);
  let mapOfJobs = docSnap.data()["statusListOfCompany"];
  if (!mapOfJobs) {
    updateDoc(docRef, { statusListOfCompany: {} });
    docRef = doc(db, "users", user.uid);
    docSnap = await getDoc(docRef);
    mapOfJobs = docSnap.data()["statusListOfCompany"];
  }
  mapOfJobs[compId] = "applied";
  updateDoc(docRef, { statusListOfCompany: mapOfJobs });

  //company
  let jobRef = doc(db, "jobPostings", compId);
  let jobSnap = await getDoc(jobRef);
  let appliedUsers = jobSnap.data()["applications"] || [];
  appliedUsers.push({ userId: user.uid, resume: resumeUrl });
  updateDoc(jobRef, { applications: appliedUsers });
};
 