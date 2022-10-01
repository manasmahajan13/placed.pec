import "./App.css";
import { AppBar, Button } from "@mui/material";
import { useState } from "react";
import Home from "./containers/home/Home";
import Jobs from "./containers/jobs/Jobs";
import Profile from "./containers/profile/Profile";

const tabsList = {
  home: "home",
  profile: "profile",
  jobs: "jobs",
};
function App() {
  const [openTab, setOpenTab] = useState(tabsList.home);

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
      <AppBar position="static" className="appbar" color="transparent">
        <div className="appBarContent">
          <div className="appLogo">placed.pec</div>
          <div className="appBarTabs">
            {Object.values(tabsList).map((name, link) => {
              return (
                <Button
                  className="navLink"
                  onClick={() => {
                    setOpenTab(name);
                  }}
                  variant="text"
                >
                  {name}
                </Button>
              );
            })}
          </div>
        </div>
      </AppBar>
      <div className="contentWrapperMain">{componentSwitcher(openTab)}</div>
    </div>
  );
}

export default App;
