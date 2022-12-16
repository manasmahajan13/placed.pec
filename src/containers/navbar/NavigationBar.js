import { Button, styled } from "@mui/material";
import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const adminTabs = [
  {
    displayName: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    displayName: "Jobs List",
    link: "/admin/jobs",
  },
];

const userTabs = [
  {
    displayName: "Home",
    link: "/",
  },
  {
    displayName: "Jobs",
    link: "/jobs",
  },
  {
    displayName: "Profile",
    link: "/profile",
  },
];

const TabButton = styled(Button)({
  padding: "16px",
  color: "#36454f",
  "&:hover": {},
  "&:active": {},
  "&:focus": {},
});

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
    <div className="appWrapper">
      <div className="navArea">
        <div className="profileArea">
          <img src={require("../../assets/images/pec-logo.png")} height={200} />
        </div>
        <div className="appBarTabs">
          {location.pathname.includes("admin") ? (
            <>
              {adminTabs.map((tab) => {
                return (
                  <TabButton
                    className="navLink"
                    variant="text"
                    onClick={() => navigate(tab.link)}
                  >
                    {tab.displayName}
                  </TabButton>
                );
              })}
            </>
          ) : (
            <>
              {userTabs.map((tab) => {
                return (
                  <TabButton
                    className="navLink"
                    variant="text"
                    onClick={() => navigate(tab.link)}
                  >
                    {tab.displayName}
                  </TabButton>
                );
              })}
            </>
          )}
        </div>
        <div className="navBottomArea">
          <TabButton
            onClick={() => logoutFunction()}
            sx={{ color: "red", fontWeight: "600" }}
          >
            Logout
          </TabButton>
        </div>
      </div>
      <div className="mainContent">
        <Outlet />
      </div>
    </div>
  );
}

export default NavBar;
