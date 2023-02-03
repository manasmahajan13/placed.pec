import { storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { getDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

export default function handleResumeUpload(file, name) {
  if (!file) {
    alert("Please upload a file first!");
  }

  const storageRef = ref(storage, `/files/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
        const auth = getAuth();
        const user = auth.currentUser;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const resumeData = docSnap.data().resume ? docSnap.data().resume : [];
        const id = uuid();
        if(resumeData.length==0) updateDoc(docRef,{starRes:id})
        resumeData.push({
          id: id,
          name: name,
          url: url,
        });
        updateDoc(docRef, {
          resume: resumeData,
        });
      });
    }
  );
}


export function starResume(id){
  const auth = getAuth();
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.uid);
  updateDoc(docRef, {starRes: id})
}

export function deleteResume(id){
  const auth = getAuth();
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.uid);
  const docSnap = getDoc(docRef);
  const resumeData = docSnap.data().resume ? docSnap.data().resume : [];
  for(let i=0;i<resumeData.length;i++)
  {
    if(id==resumeData[i]['id']){
      resumeData.splice(i,1)
    }
  }
}
