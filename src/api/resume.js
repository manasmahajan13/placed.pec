import { storage } from "../firebase-config";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { getDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";

export function handleResumeUpload(file, name, onComplete) {
  if (!file) {
    alert("Please upload a file first!");
  }
  const id = uuid();
  const storageRef = ref(storage, `/resume/${id}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

// <<<<<<< multipleResume
    const storageRef = ref(storage, `/files/${file.name}`);
    const name = storageRef.name
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          const auth = getAuth();
          const user = auth.currentUser;
          const docRef = doc(db, "users", user.uid);
          const docSnap = getDoc(docRef);
          updateDoc(docRef, { urlResume: url });
          updateDoc(docRef, { nameOfMainResume: name });
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleChange} accept="application/pdf" />
      <button onClick={handleUpload}>Upload to Firebase</button>
      <p>{percent} "% done"</p>
    </div> 
// =======
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       const percent = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );
//     },
//     (err) => console.log(err),
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
//         const auth = getAuth();
//         const user = auth.currentUser;
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);
//         const resumeData = docSnap.data().resume ? docSnap.data().resume : [];

//         if (resumeData.length == 0) updateDoc(docRef, { primaryResume: id });
//         resumeData.push({
//           id: id,
//           name: name,
//           url: url,
//         });
//         updateDoc(docRef, {
//           resume: resumeData,
//         }).then(()=>{
//           onComplete();
//         });
//       });
//     }
// >>>>>>> main
  );
}

export function starResume(id) {
  const auth = getAuth();
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.uid);
  updateDoc(docRef, { primaryResume: id });
}

async function deleteRefFromStorage(id) {
  const fileRef = ref(storage, `/resume/${id}`);

  try {
    return await deleteObject(fileRef);
  } catch (error) {
    throw error;
  }
  
}

export async function deleteResume(id) {
  const auth = getAuth();
  const user = auth.currentUser;
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  const resumeData = docSnap.data().resume ? docSnap.data().resume : [];
  for (let i = 0; i < resumeData.length; i++) {
    if (id == resumeData[i]["id"]) {
      try {
        await deleteRefFromStorage(resumeData[i]["id"]);
        resumeData.splice(i, 1);
        updateDoc(docRef, { resume: resumeData });
      } catch (error) {
        throw error;
      }
    }
  }
}
