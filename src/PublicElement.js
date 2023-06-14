import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "./firebase-config";

export default function PublicElement({ children }) {
  const [renderChildren, setRenderChildren] = useState(<><div>Checking Authorization. Please Wait.</div></>);
  useEffect(() => {
    const fetchData = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.data().userType == "student") {
        setRenderChildren(children);
      } else {
        setRenderChildren(
          <>
            <div>You are NOT AUTHORISED to view this webpage.</div>
          </>
        );
      }
    };
    fetchData();
  }, []);
  return renderChildren;
}
