import { db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const getProfile = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.uid);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      return "No such document!";
    }
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (data) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.uid);
  try {
    await updateDoc(docRef, data);
  } catch (error) {
    throw error;
  }
};
