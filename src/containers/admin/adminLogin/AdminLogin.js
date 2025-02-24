import { Button, TextField } from "@mui/material";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase-config";

function AdminLogin(props) {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loginCodeMessage, setLoginCodeMessage] = useState();

  const [loading, setLoading] = useState(false);

  const { signIn } = useAuth();
    
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/admin/dashboard";

  const login = async () => {
    try {
      setLoading(true);
      await signIn(loginEmail, loginPassword);
      const auth = getAuth();
      const currentUser = auth.currentUser;
      let docRef = doc(db, "adminUsers", currentUser.uid); // change "users" to adminData
      let docSnap = await getDoc(docRef);
      if (docSnap.data() && docSnap.data().userType == "admin") {
        navigate(from, { replace: true });
      }
      else{
        setLoginCodeMessage("You are not authorised to login here. Kindly login on student's login Page.")
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
          <h1>Admin Sign in</h1>
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
            Forgot Password? <Link to="/reset-password">Reset</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
