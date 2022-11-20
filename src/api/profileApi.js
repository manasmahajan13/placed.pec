import { db } from "../firebase-config";
import {
    getDoc 
  } from "firebase/firestore";
import {getAuth} from "firebase/auth";

export const getProfile = async()=>{
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data();
    } else {
    // doc.data() will be undefined in this case
    // console.log("No such document!");
    return "No such document!";
    }
}

export const updateProfile =async (data)=>{
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(db, "users", user.uid);
    await updateDoc(docRef , data)
}