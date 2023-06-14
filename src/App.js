import "./App.css";
import Home from "./containers/home/Home";
import Jobs from "./containers/jobs/Jobs";
import Profile from "./containers/profile/Profile";
import { Route, Routes } from "react-router-dom";
import Login from "./containers/login-registration/Login";
import Signup from "./containers/login-registration/Signup";
import NavBar from "./containers/navbar/NavigationBar";
import { AuthProvider } from "./contexts/AuthContext";
import { RequireAuth } from "./helpers/RequireAuth";
import AdminPanel from "./containers/admin/AdminPanel";
import JobDetails from "./containers/jobs/jobDetails/JobDetails";
import AdminJobs from "./containers/admin/adminJobs/AdminJobs";
import AdminDashboard from "./containers/admin/adminDashboard/AdminDashboard";
import AdminJobDetails from "./containers/admin/adminJobs/adminJobDetails/AdminJobDetails";
import CreateJobPosting from "./containers/admin/adminJobs/CreateJobPosting";
import StudentCG from "./containers/admin/studentCG/studentCG";
import { SnackbarProvider } from "notistack";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ResetPassword from "./containers/login-registration/ResetPassword";
import PlacementCycle from "./containers/admin/placementCycle/PlacementCycle";
import CreatePlacementCycle from "./containers/admin/placementCycle/CreatePlacementCycle";
import PublicElement from "./PublicElement";


function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <div className="App">
            <>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* <Route path="/signup/user-data" element={<SignupUserData />} /> */}
                <Route
                  element={
                    <PublicElement>
                      <NavBar />
                    </PublicElement>
                  }
                >
                  <Route
                    element={
                      <PublicElement>
                        <RequireAuth />
                      </PublicElement>
                    }
                  >
                    <Route
                      path="/"
                      element={
                        <PublicElement>
                          <Home />
                        </PublicElement>
                      }
                    />
                    <Route
                      path="/jobs"
                      element={
                        <PublicElement>
                          <Jobs />
                        </PublicElement>
                      }
                    />
                    <Route
                      path="/jobs/:id"
                      element={
                        <PublicElement>
                          <JobDetails />
                        </PublicElement>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <PublicElement>
                          <Profile />
                        </PublicElement>
                      }
                    />
                  </Route>

                  <Route element={<RequireAuth />}>
                    <Route element={<AdminPanel />}>
                      {/* <Route
                        path="/admin/dashboard"
                        element={<AdminDashboard />}
                      /> */}
                      <Route path="/admin/jobs" element={<AdminJobs />} />
                      <Route
                        path="/admin/placementCycle"
                        element={<PlacementCycle />}
                      />
                      <Route path="/admin/studentCG" element={<StudentCG />} />
                      <Route
                        path="/admin/jobs/:id"
                        element={<AdminJobDetails />}
                      />
                      <Route
                        path="/admin/jobs/create-new"
                        element={<CreateJobPosting />}
                      />
                      <Route
                        path="/admin/placementCycle/create-new"
                        element={<CreatePlacementCycle />}
                      />
                    </Route>
                  </Route>
                </Route>
              </Routes>
            </>
          </div>
        </AuthProvider>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
