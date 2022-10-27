import "./App.css";
import { AppBar, Button } from "@mui/material";
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

import { Link, Route, Routes } from "react-router-dom";
import Login from "./containers/login-registration/Login";

const tabsList = {
  home: "home",
  profile: "profile",
  jobs: "jobs",
};
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const logoutFunction = async () => {
    try {
      const response = await signOut(auth);
      console.log(response);
    } catch (error) {
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
              <Button onClick={() => logoutFunction()}>Logout</Button>
            </div>
          </AppBar>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </div>
  );
}

export default App;
