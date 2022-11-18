import React from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import {getAuth} from "firebase/auth"; 
import {collection,doc,setDoc} from "firebase/firestore"
import {db} from "../../firebase-config"

export default function SignupUserData() {

  const [name, setName] = useState("");
  const [sid, setSid] = useState("");

  const [userdataErrorCode, setUserdataErrorCode] = useState("");

  const saveUserData = () => {

  }

  return (
    <div className="signupContainer">
      <div className="homeImg">
        <img src={require("../../assets/images/pec-home.jpg")} />
      </div>
      <div className="signupDialogContainer">
        <div className="signupDialog">
          <h1>General Information</h1>
          {/* <h2>{currentUser?.email}</h2> */}
          <TextField
            id="name"
            label="name"
            variant="outlined"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />
          <TextField
            id="sid"
            label="sid"
            variant="outlined"
            value={sid}
            onChange={(event) => {
              setSid(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />
          <Button onClick={saveUserData} variant="contained">
            NEXT
          </Button>
          <p>{userdataErrorCode}</p>
        </div>
      </div>
    </div>
  );

}