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
      <AppBar
        position="sticky"
        className="appbar"
        sx={{ backgroundColor: "#fff" }}
      >
        <div className="appBarContent">
          <div className="appLogo">
            <img src={require("./assets/images/pec-logo.png")} height={60} />
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
    </div>
  );
}

export default App;
