import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "**",
  authDomain: "**",
  databaseURL: "**",
  projectId: "**",
  storageBucket: "**",
  messagingSenderId: "**",
  appId: "**",
  measurementId: "**",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db= getFirestore(app)
