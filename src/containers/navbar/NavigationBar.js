import { AppBar, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

const tabsList = {
  home: "home",
  profile: "profile",
  jobs: "jobs",
};

function NavBar(props) {
  const logoutFunction = async () => {
    try {
      const response = await signOut(auth);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <AppBar
      position="sticky"
      className="appbar"
      sx={{ backgroundColor: "#fff" }}
    >
      <div className="appBarContent">
        <div className="appLogo">
          <img src={require("../../assets/images/pec-logo.png")} height={60} />
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
  );
}

export default NavBar;
