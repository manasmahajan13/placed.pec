import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAy_cqxrY4qa5xD40X5kqTFGHEN965csao",
  authDomain: "my-first-project-1a97a.firebaseapp.com",
  projectId: "my-first-project-1a97a",
  storageBucket: "my-first-project-1a97a.appspot.com",
  messagingSenderId: "367026642905",
  appId: "1:367026642905:web:f6e292ec2a60dc25b343c8",
  measurementId: "G-K9VJX5GEHC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
