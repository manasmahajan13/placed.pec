import "./App.css";
import { Alert, AppBar, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Home from "./containers/home/Home";
import Jobs from "./containers/jobs/Jobs";
import Profile from "./containers/profile/Profile";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import { async } from "@firebase/util";
import { Link, Route, Routes } from "react-router-dom";

const tabsList = {
  home: "home",
  profile: "profile",
  jobs: "jobs",
};
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [openTab, setOpenTab] = useState(tabsList.home);

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
    <div className="App">
      {loggedIn ? (
        <>
          <AppBar
            position="sticky"
            className="appbar"
            sx={{ backgroundColor: "#fff" }}
          >
            <div className="appBarContent">
              <div className="appLogo">
                <img
                  src={require("./assets/images/pec-logo.png")}
                  height={60}
                />
              </div>
              <div className="appBarTabs">
                {Object.values(tabsList).map((name, link) => {
                  return (
                    <Button className="navLink" variant="text" key={name}>
                      <Link to={`/${name}`}>{name}</Link>
                    </Button>
                  );
                })}
              </div>
            </div>
          </AppBar>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </>
      ) : (
        <div className="loginContainer">
          <div className="homeImg">
            <img src={require("./assets/images/pec-home.jpg")} />
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
