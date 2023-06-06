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

export const createPlacementCycle = async (data) => {
  const docRef = await addDoc(collection(db, "placementCycle"), data);
  await updateDoc(docRef, {
    jobPostings: [],
    users: [],
    id: docRef.id,
  });
};

export const placementCycleListing = async () => {
  var Query = query(collection(db, "placementCycle"), orderBy("year", "desc"));
  const cycleList = [];
    const documentSnapshots = await getDocs(Query);
    documentSnapshots.docs.forEach((doc) => {
      cycleList.push(doc.data());
    });
    const response = cycleList;
    return response;

}

