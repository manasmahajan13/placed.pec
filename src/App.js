import "./App.css";
import { useState } from "react";
import Home from "./containers/home/Home";
import Jobs from "./containers/jobs/Jobs";
import Profile from "./containers/profile/Profile";

import { Route, Routes } from "react-router-dom";
import Login from "./containers/login-registration/Login";
import Signup from "./containers/login-registration/Signup";
import NavBar from "./containers/navbar/NavigationBar";
import { AuthProvider } from "./contexts/AuthContext";
import { RequireAuth } from "./helpers/RequireAuth";
// import SignupUserData from "./containers/login-registration/SignupUserData";
import AdminPanel from "./containers/admin/AdminPanel";
import JobDetails from "./containers/jobs/jobDetails/JobDetails";
import AdminJobs from "./containers/admin/adminJobs/AdminJobs";
import AdminDashboard from "./containers/admin/adminDashboard/AdminDashboard";
import AdminJobDetails from "./containers/admin/adminJobs/adminJobDetails/AdminJobDetails";
import CreateJobPosting from "./containers/admin/adminJobs/CreateJobPosting";
import { SnackbarProvider } from "notistack";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <SnackbarProvider maxSnack={3}>
      <AuthProvider>
        <div className="App">
          <>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              {/* <Route path="/signup/user-data" element={<SignupUserData />} /> */}
              <Route element={<NavBar />}>
                <Route element={<RequireAuth />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/jobs/:id" element={<JobDetails />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                <Route element={<RequireAuth />}>
                  <Route element={<AdminPanel />}>
                    <Route
                      path="/admin/dashboard"
                      element={<AdminDashboard />}
                    />
                    <Route path="/admin/jobs" element={<AdminJobs />} />
                    <Route
                      path="/admin/jobs/:id"
                      element={<AdminJobDetails />}
                    />
                    <Route
                      path="/admin/jobs/create-new"
                      element={<CreateJobPosting />}
                    />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </>
        </div>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
