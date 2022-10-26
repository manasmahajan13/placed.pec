import "./App.css";
import { AppBar, Button, TextField } from "@mui/material";
import { useState } from "react";
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

  const [user, setUser] = useState({});

  // To update/fetch current user session #Donot remove
  // onAuthStateChanged(auth, (currentUser) => {
  //   setUser(currentUser);
  // });

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
      console.log(error.message);
    }
  };


  const componentSwitcher = (component) => {
    switch (component) {
      case tabsList.home:
        return <Home />;
      case tabsList.jobs:
        return <Jobs />;
      case tabsList.profile:
        return <Profile />;
      default:
        return <div>error</div>;
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
                    <Button
                      className="navLink"
                      onClick={() => {
                        setOpenTab(name);
                      }}
                      variant="text"
                      key={name}
                    >
                      {name}
                    </Button>
                  );
                })}
              </div>
            </div>
          </AppBar>
          <div className="contentWrapperMain">{componentSwitcher(openTab)}</div>
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
              <Button 
                onClick={login}
                 variant="contained">
                Login
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
