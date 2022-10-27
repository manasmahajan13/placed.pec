import "./App.css";
import { useState } from "react";
import Home from "./containers/home/Home";
import Jobs from "./containers/jobs/Jobs";
import Profile from "./containers/profile/Profile";

import { Route, Routes } from "react-router-dom";
import Login from "./containers/login-registration/Login";
import NavBar from "./containers/navbar/NavigationBar";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {loggedIn ? (
        <>
          <NavBar />
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
