import { AppBar, Button } from "@mui/material";
import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function NavBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const logoutFunction = async () => {
    try {
      await logout();
      navigate("/login");
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
            {location.pathname.includes("admin") ? (
              <>
                <Button onClick={() => navigate("/admin/dashboard")}>
                  Dashboard
                </Button>
                <Button onClick={() => navigate("/admin/jobs")}>
                  Jobs List
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="navLink"
                  variant="text"
                  onClick={() => navigate("/")}
                >
                  Home
                </Button>
                <Button
                  className="navLink"
                  variant="text"
                  onClick={() => navigate("/jobs")}
                >
                  Jobs
                </Button>
                <Button
                  className="navLink"
                  variant="text"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </Button>
              </>
            )}
          </div>
          <Button onClick={() => logoutFunction()}>Logout</Button>
        </div>
      </AppBar>
      <Outlet />
    </>
  );
}

export default NavBar;
