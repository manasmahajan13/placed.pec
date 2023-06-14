import { Button } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { db } from "../../firebase-config";

import "./AdminPanel.css";

export default function AdminPanel() {
  // const navigate = useNavigate();
  // return (
  //   <div className="adminWrapper">
  //     <Outlet />
  //   </div>
  // );

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
      if (docSnap.data().userType == "admin") {
        console.log("d");
        setRenderChildren(
            <Outlet />
        );
      } else {
        setRenderChildren(
          <>
            <div>You are NOT AUTHORISED to view this webpage.</div>
          </>
        );
      }
    };
    fetchData();
  }, [currentUrl]);
  return renderChildren;
}
