import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./NavigationBar.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const adminTabs = [
  {
    displayName: "Dashboard",
    link: "/admin/dashboard",
  },
  {
    displayName: "Jobs",
    link: "/admin/jobs",
  },
  {
    displayName: "Grades",
    link: "/admin/studentCG"
  },
];

const userTabs = [
  {
    displayName: "Home",
    // icon: <HomeOutlinedIcon />,
    link: "/",
  },
  {
    displayName: "Jobs",
    // icon: <WorkOutlineOutlinedIcon />,
    link: "/jobs",
  },
  {
    displayName: "Profile",
    // icon: <PersonOutlineOutlinedIcon/>,
    link: "/profile",
  },
];

function NavBar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const initialTab = location.pathname.includes("admin")
    ? adminTabs.findIndex((obj) => {
        return location.pathname.includes(obj.link);
      })
    : userTabs.findIndex((obj) => {
        return location.pathname.includes(obj.link);
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
                        icon={tab.icon}
                        iconPosition="start"
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
                        icon={tab.icon}
                        iconPosition="start"
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
            sx={{
              color: "red",
              fontWeight: "600",
              padding: "16px",
              width: "100%",
            }}
            startIcon={<ExitToAppOutlinedIcon />}
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
