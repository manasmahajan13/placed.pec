import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";

function Login({ setLoggedIn }) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loginCodeMessage, setLoginCodeMessage] = useState();

  const [loading, setLoading] = useState(false);

  const { signIn, currentUser } = useAuth();

  const login = async () => {
    try {
      setLoading(true);
      await signIn(loginEmail, loginPassword);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setLoginCodeMessage("Username and Password did not match.");
          break;
        case "auth/user-not-found":
          setLoginCodeMessage("User doesn't exist");
          break;
      }
    }

    setLoading(false);
  };

  return (
    <div className="loginContainer">
      <div className="homeImg">
        <img src={require("../../assets/images/pec-home.jpg")} />
      </div>
      <div className="loginDialogContainer">
        <div className="loginDialog">
          <h1>Sign in</h1>
          <h2>{currentUser?.email}</h2>
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
          <Button onClick={login} variant="contained" disabled={loading}>
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
