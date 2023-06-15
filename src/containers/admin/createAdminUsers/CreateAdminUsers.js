import React from "react";
import "./createAdminUsers.css";
import { Button, Grid, TextField } from "@mui/material";
import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase-config";
import { collection, doc, setDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CreateAdminUsers() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [createAdminUserCode, setCreateAdminUserCode] = useState("");

  const submitData = async () => {
    // const auth = getAuth();
    
    if (password !== confirmPassword) {
      setCreateAdminUserCode("Passwords do not match");
      return;
    }
    const user = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        const data = {
          email: email,
          fullName: fullName,
          userType: "admin",
        };
        const usersRef = collection(db, "adminUsers");
        setDoc(doc(db, "adminUsers", user.uid), data);
        const userRef = doc(db, "adminUsers", user.uid);
        alert("all well");
        // Navigate("/admin/createAdminUsers");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setCreateAdminUserCode(
              "User with entered Email Id already exists."
            );
            break;
          case "auth/weak-password":
            setCreateAdminUserCode("Password should be at least 6 characters");
            break;
          default:
            setCreateAdminUserCode(error.message);
        }
        console.log(error);
      });
  };

  return (
    <div className="newPlacementCycleWrapper">
      <div className="newPlacementCycleHeader">
        <div className="title">Create Admin Account</div>
      </div>
      <div className="newPlacementCycleBody">
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="fullName"
                label="Full Name"
                onChange={(event) => {
                  setFullName(event.target.value);
                }}
                value={fullName}
              ></TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="email"
                label="Email ID"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                value={email}
              ></TextField>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="password"
                label="Password"
                size="small"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                id="confirmPassword"
                label="Re-Enter Password"
                size="small"
                type="password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
        <br />
        <Button variant="contained" onClick={submitData}>
          Submit
        </Button>
        <p className="statusCode">{createAdminUserCode}</p>
      </div>
    </div>
  );
}
