import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase-config";

function Login({ setLoggedIn }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loginCodeMessage, setLoginCodeMessage] = useState();

  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
  }, []);

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
      setLoggedIn(true);
    } catch (error) {
      {
        switch (error.code) {
          case "auth/wrong-password":
            setLoginCodeMessage("Username and Password did not match.");
            break;
          case "auth/user-not-found":
            setLoginCodeMessage("User doesn't exist");
            break;
        }
      }
      console.log(error.message);
    }
  };
  return (
    <div className="loginContainer">
      <div className="homeImg">
        <img src={require("../../assets/images/pec-home.jpg")} />
      </div>
      <div className="loginDialogContainer">
        <div className="loginDialog">
          <h1>Sign in</h1>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={loginEmail}
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />
          <Button onClick={login} variant="contained">
            Login
          </Button>
          <p>{loginCodeMessage}</p>
          <div>Don't have an account yet? Signup instead</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
