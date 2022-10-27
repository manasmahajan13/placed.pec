import { AppBar, Button } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-config";

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
    <>
      <AppBar
        position="sticky"
        className="appbar"
        sx={{ backgroundColor: "#fff" }}
      >
        <div className="appBarContent">
          <div className="appLogo">
            <img
              src={require("../../assets/images/pec-logo.png")}
              height={60}
            />
          </div>
          <div className="appBarTabs">
            <Button className="navLink" variant="text">
              <Link to={`/`}>Home</Link>
            </Button>
            <Button className="navLink" variant="text">
              <Link to={`/jobs`}>Jobs</Link>
            </Button>
            <Button className="navLink" variant="text">
              <Link to={`/profile`}>Profile</Link>
            </Button>
          </div>
          <Button onClick={() => logoutFunction()}>Logout</Button>
        </div>
      </AppBar>
      <Outlet />
    </>
  );
}

export default NavBar;
