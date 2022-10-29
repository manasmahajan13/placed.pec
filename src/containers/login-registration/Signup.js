import React from "react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Button, TextField } from "@mui/material";

import { auth } from "../../firebase-config";

function Signup() {
  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  const [signupErrorCode, setsignupErrorCode] = useState("");

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      navigate("/signup/user-data");
      console.log(user);
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setsignupErrorCode(
            "User already exists. Kindly proceed to Login page."
          );
          break;
        case "auth/weak-password":
          setsignupErrorCode("Password should be at least 6 characters");
          break;
        default:
          setsignupErrorCode(error.message);
      }

      console.log(error);
    }
  };

  return (
    <div className="signupContainer">
      <div className="homeImg">
        <img src={require("../../assets/images/pec-home.jpg")} />
      </div>
      <div className="signupDialogContainer">
        <div className="signupDialog">
          <h1>Sign up</h1>
          {/* <h2>{currentUser?.email}</h2> */}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={registerEmail}
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />
          <TextField
            id="password"
            autoComplete="off"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />
          <Button onClick={register} variant="contained">
            Signup
          </Button>
          <p>{signupErrorCode}</p>
          <div>
            Already have an account? <Link to="/login">Log In</Link> instead
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
