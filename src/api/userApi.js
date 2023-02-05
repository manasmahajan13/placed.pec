import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

export const resetPassword = async (email) => {
  const auth = getAuth();
  const response = await sendPasswordResetEmail(auth, email);
  console.log("email sent at ", email);
  return response;
};

export async function fetchUsers() {
  const users = [];
  const colRef = collection(db, "users");
  try {
    const docsSnap = await getDocs(colRef);
    // console.log(docsSnap.size);
    docsSnap.forEach((doc) => {
      users.push({id: doc.id, ...doc.data()});
    });
    return users;
  } catch (err) {
    console.log(err);
    throw err;
  }
}