import { db } from "../firebase-config";
import {
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const multipleResumeUpload = async(url,nameOfResume)=>{
    const auth = getAuth();
    const user = auth.currentUser;
    let docRef = doc(db, "users", user.uid);
    let docSnap = getDoc(docRef);
    let MultipleResume= docSnap.data()["multipleUrlResume"];
    let urlOfMainResume = docSnap.data()["urlResume"];
    let nameResume = docSnap.data()["nameOfMainResume"];
    if (!MultipleResume) {
        updateDoc(docRef, { multipleUrlResume: {} });
        docRef = doc(db, "users", user.uid);
        docSnap = await getDoc(docRef);
        MultipleResume = docSnap.data()["multipleUrlResume"];
        MultipleResume[nameResume]=urlOfMainResume;
    }
    MultipleResume[nameOfResume]=url;
    updateDoc(docRef, { multipleUrlResume: MultipleResume});
}

export const starResume = async(nameOfResume) => {
    const auth = getAuth();
    const user = auth.currentUser;
    let docRef = doc(db, "users", user.uid);
    let docSnap = getDoc(docRef);
    let  MultipleResume= docSnap.data()["multipleUrlResume"]
    const urlNewResumeMain = MultipleResume[nameOfResume]
    updateDoc(docRef, { nameOfMainResume: nameOfResume});
    updateDoc(docRef, { urlResume: urlNewResumeMain});
}