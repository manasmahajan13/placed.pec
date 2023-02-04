import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./NavigationBar.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

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

function NavBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const initialTab = location.pathname.includes("admin")
    ? adminTabs.findIndex((obj) => {
        return obj.link === location.pathname;
      })
    : userTabs.findIndex((obj) => {
        return obj.link === location.pathname;
      });

  const [value, setValue] = React.useState(initialTab);

  const handleChange = (event, newValue) => {
    navigate(event.target.id);
    setValue(newValue);
  };

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
          <>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="navigation tabs"
              orientation="vertical"
              TabIndicatorProps={{
                style: { display: "none" },
              }}
            >
              {location.pathname.includes("admin")
                ? adminTabs.map((tab, index) => {
                    return (
                      <Tab
                        className="navLink"
                        key={tab.link}
                        id={tab.link}
                        label={tab.displayName}
                        disableRipple
                      />
                    );
                  })
                : userTabs.map((tab, index) => {
                    return (
                      <Tab
                        className="navLink"
                        key={tab.link}
                        id={tab.link}
                        label={tab.displayName}
                        disableRipple
                      />
                    );
                  })}
            </Tabs>
          </>
        </div>
        <div className="navBottomArea">
          <Button
            onClick={() => logoutFunction()}
            sx={{ color: "red", fontWeight: "600", padding: "16px", width: "100%" }}
          >
            Logout
          </Button>
        </div>
      </div>
      <div className="mainContent">
        <Outlet />
      </div>
    </div>
  );
}

export default NavBar;
