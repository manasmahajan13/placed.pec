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
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const getJobs = async (pageSize, lastDoc) => {
  var Query;
  if (lastDoc) {
    Query = query(
      collection(db, "jobPostings"),
      orderBy("published"),
      limit(pageSize),
      startAfter(lastDoc)
    );
  } else {
    Query = query(
      collection(db, "jobPostings"),
      orderBy("published"),
      limit(pageSize)
    );
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

export const getJobDetails = async (jobId) => {
  const docRef = doc(db, "jobPostings", jobId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    // console.log("No such document!");
    return "No such document!";
  }
};

export const createJobPosting = async (data) => {
  const docRef = await addDoc(collection(db, "jobPostings"), data);
  await updateDoc(docRef, {
    documentID: docRef.id,
    published: serverTimestamp(),
  });

  console.log("successful creation of jobPostings!:::::", docRef.id);
};

export const listOfusersApplied = async (compId) => {
  const jobRef = doc(db, "jobPostings", compId);
  const jobSnap = await getDoc(jobRef);
  const appliedUsers = jobSnap.data()["usersApplied"];
  const usersApplicant = [];
  for (let i = 0; i < appliedUsers.length; i++) {
    const docRef = doc(db, "users", appliedUsers[i].first);
    const docSnap = await getDoc(docRef);
    const name = docSnap.data()["fullName"];
    const resume = docSnap.data()["urlResume"];
    usersApplicant.push(name, resume);
  }
  return usersApplicant;
};

export const applyJobs = async (compId) => {
  //users
  const auth = getAuth();
  const user = auth.currentUser;
  let docRef = doc(db, "users", user.uid);
  let docSnap = await getDoc(docRef);
  let mapOfJobs = docSnap.data()["statusListOfCompany"];
  if (!mapOfJobs) {
    updateDoc(docRef, { statusListOfCompany: {} });
    docRef = doc(db,"users",user.uid)
    docSnap = await getDoc(docRef)
    mapOfJobs = docSnap.data()["statusListOfCompany"];
  }
  mapOfJobs[compId] = "applied";
  updateDoc(docRef, { statusListOfCompany: mapOfJobs });

  //company
  let jobRef = doc(db, "jobPostings", compId);
  let jobSnap = await getDoc(jobRef);
  let appliedUsers = jobSnap.data()["usersApplied"];
  if (!appliedUsers) {
    updateDoc(jobRef, { usersApplied: [] });
    jobRef = doc(db,"jobPostings",compId)
    jobSnap = await getDoc(jobRef)
    appliedUsers = jobSnap.data()["usersApplied"];
  }
  appliedUsers.push(user.uid)
  updateDoc(jobRef, { usersApplied: appliedUsers });
};
