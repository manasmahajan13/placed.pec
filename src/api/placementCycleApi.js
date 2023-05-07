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
      id: docRef.id
    });
  };