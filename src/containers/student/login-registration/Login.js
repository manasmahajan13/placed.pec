import { Button, TextField } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase-config";

function Login(props) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loginCodeMessage, setLoginCodeMessage] = useState();

  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";

  const login = async () => {
    try {
      setLoading(true);
      await signIn(loginEmail, loginPassword);
      const auth = getAuth();
      const currentUser = auth.currentUser;
      let docRef = doc(db, "users", currentUser.uid);
      let docSnap = await getDoc(docRef);
      if (docSnap && docSnap.data().userType == "student") {
        navigate(from, { replace: true });
      }
      else{
        setLoginCodeMessage("Not a student account. Kindly login on admin's login Page.")
      }
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          setLoginCodeMessage("Username and Password did not match.");
          break;
        case "auth/user-not-found":
          setLoginCodeMessage("User doesn't exist");
          break;
        case "auth/invalid-email":
          setLoginCodeMessage("Invalid email");
          break;
        default:
          setLoginCodeMessage(error.message);
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="loginContainer">
      <div className="homeImg">
        <img src={require("../../../assets/images/pec-home.jpg")} />
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
            autoComplete="off"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />
          <Button onClick={login} variant="contained" disabled={loading}>
            Login
          </Button>
          <p style={{ color: "red" }}>{loginCodeMessage}</p>
          <div>
            Don't have an account yet? <Link to="/signup">Sign Up</Link> instead
          </div>
          <div>
            Forgot Password? <Link to="/reset-password">Reset</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
