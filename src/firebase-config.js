import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIlxxCWJv9UoMAq8w02TRzL51OpnBiAHY",
  authDomain: "hired-db309.firebaseapp.com",
  databaseURL: "https://hired-db309-default-rtdb.firebaseio.com",
  projectId: "hired-db309",
  storageBucket: "hired-db309.appspot.com",
  messagingSenderId: "997596575258",
  appId: "1:997596575258:web:1139462113a07eaa4a83a3",
  measurementId: "G-VXXVP44TG1",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db= getFirestore(app)
