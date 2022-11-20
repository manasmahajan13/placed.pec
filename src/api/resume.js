import { useState } from "react";
import { storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getAuth} from "firebase/auth";
import {
    updateDoc 
  } from "firebase/firestore";

  function App() {
    // State to store uploaded file
    const [file, setFile] = useState("");
 
    // progress
    const [percent, setPercent] = useState(0);
 
    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }
 
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
 
        const storageRef = ref(storage, `/files/${file.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    const auth = getAuth();
                    const user = auth.currentUser;
                    const docRef = doc(db, "users", user.uid);
                    const docSnap =  getDoc(docRef);
                    updateDoc(docRef , {urlResume: url});
                    console.log(url);
                });
            }
        );
    };
 
    return (
        <div>
            <input type="file" onChange={handleChange} accept="/image/*" />
            <button onClick={handleUpload}>Upload to Firebase</button>
            <p>{percent} "% done"</p>
        </div>
    );
}
 
export default App;
  
