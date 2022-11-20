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