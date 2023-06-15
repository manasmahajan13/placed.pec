import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { db } from "../../firebase-config";

export default function PublicElement() {
    const [renderChildren, setRenderChildren] = useState(
        <>
          <div>Checking Authorization. Please Wait.</div>
        </>
      );
      const currentUrl = window.location.pathname;
      useEffect(() => {
        const fetchData = async () => {
          const auth = getAuth();
          const user = auth.currentUser;
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.data() && docSnap.data().userType == "student") {
            setRenderChildren(
                <Outlet />
            );
          } else {
            setRenderChildren(
              <>
                <div style={{ color: "red" }}>You are <b>NOT AUTHORISED</b> to view this webpage.</div>
              </>
            );
          }
        };
        fetchData();
      }, [currentUrl]);
      return renderChildren;
}
