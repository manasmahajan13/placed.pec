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
  getDoc
} from "firebase/firestore";

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

export const createJobPosting = async (data) => {
  const docRef = await addDoc(collection(db, "jobPostings"), data);
  await updateDoc(docRef, {
    documentID: docRef.id,
    published: serverTimestamp(),
  });

  console.log("successful creation of jobPostings!:::::", docRef.id);
};

const listOfusersApplied = async(compId)=>{
  const jobRef = doc(db, "jobPostings", compId);
  const jobSnap = await getDoc(jobRef);
  const appliedUsers = docSnap.data()[usersApplied];
  const usersApplicant = [];
  for (let i = 0; i < appliedUsers.length; i++) {
    const docRef = doc(db, "users", appliedUsers[i]);
    const docSnap = await getDoc(docRef);
    const name = docSnap.data()[fullName]
    const resume = docSnap.data()[urlResume]
    usersApplicant.push(name,resume)
  }
  return usersApplicant;
}


const applyJobs = async(compId)=>{

  //users
  const auth = getAuth();
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  const mapOfJobs = docSnap.data()[statusListOfCompany]
  mapOfJobs[compId]="applied";
  updateDoc(docRef,{statusListOfCompany:mapOfJobs});

  //company
  const jobRef = doc(db, "jobPostings", compId);
  const jobSnap = await getDoc(jobRef);
  const appliedUsers = docSnap.data()[usersApplied];
  appliedUsers.push(user.uid);
  updateDoc(jobRef,{usersApplied:appliedUsers});

}