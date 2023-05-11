import React from "react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { Button, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, TextField } from "@mui/material";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase-config";
import { sidToBranch } from "../profile/Profile";
import { sidToPassoutBatch } from "../profile/Profile";

export async function findPlacementcycleId(batch, year) {
  const Query = query(
    collection(db, "placementCycle"),
    orderBy("type", "desc")
  );
  var placeId = "";
  const placeSnap = await getDocs(Query);
  placeSnap.docs.forEach((doc) => {
    const Batch = doc.data()["batch"];
    const Year = doc.data()["year"];
    if(batch==Batch&&Year==year){
      placeId = doc.data()["id"];
    }
  });
  console.log(placeId);
  return placeId;
}

function checkForBatch(codeForBatch) {
  if (codeForBatch == "1") return "B. Tech";
  else if (codeForBatch == "2") return "M. Tech";
  else return "P.H.D.";
}

function Signup() {
  const navigate = useNavigate();

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [checkRegisterPassword, setCheckRegisterPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [sid, setSid] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [type, setType] = useState("");
  const [signupErrorCode, setsignupErrorCode] = useState("");

  const typeItems = ["Intern", "Full Time"];

  const register = async () => {
    const auth = getAuth();
    const re = /^[0-9\b]+$/;
    if (cgpa === "" || re.test(cgpa)) {
    } else {
      setCgpa("");
      setsignupErrorCode(
        "Please Enter a valid CGPA. CGPA must lie in the range 1.0 to 10.0"
      );
      return;
    }
    if (cgpa < 1.0 || cgpa > 10.0) {
      setCgpa("");
      setsignupErrorCode(
        "Please Enter a valid CGPA. CGPA must lie in the range 1.0 to 10.0"
      );
      return;
    }
    if (registerPassword !== checkRegisterPassword) {
      setsignupErrorCode("Passwords do not match");
      return;
    }
    const user = await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword
    )
      .then((userCredential) => {
        const user = userCredential.user;
        const data = {
          email: registerEmail,
          fullName: fullName,
          SID: sid,
          cgpa: cgpa,
          statusListOfCompany: {},
          cgpaVerificationStatus: "Not Verified",
          type: type,
        };
        const usersRef = collection(db, "users");
        setDoc(doc(db, "users", user.uid), data);
        const userRef = doc(db, "users", user.uid);
        var year = sidToPassoutBatch(sid);
        year = year.substring(0, 4);
        const codeForBatch = sid.substring(2, 1);
        const batch = checkForBatch(codeForBatch);
        const temp = findPlacementcycleId(batch, year);
        temp.then(async (result) => {
          updateDoc(userRef, { placementCycleId: result });
          console.log("successful creation of user!", user);
          const placeRef = doc(db, "placementCycle", result);
          const placeSnap = await getDoc(placeRef);
          const usersPost = placeSnap.data()["users"];
          usersPost.push(user.uid);
          updateDoc(placeRef, {users : usersPost});
        });
        navigate("/");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setsignupErrorCode(
              "User already exists. Kindly proceed to Login page."
            );
            break;
          case "auth/weak-password":
            setsignupErrorCode("Password should be at least 6 characters");
            break;
          default:
            setsignupErrorCode(error.message);
        }
        console.log(error);
      });
  };

  return (
    <div className="signupContainer">
      <div className="homeImg">
        <img src={require("../../assets/images/pec-home.jpg")} />
      </div>
      <div className="signupDialogContainer">
        <div className="signupDialog">
          <h1>Sign up</h1>
          {/* <h2>{currentUser?.email}</h2> */}
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={registerEmail}
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />
          <TextField
            id="password"
            autoComplete="off"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />
          <TextField
            id="password-check"
            autoComplete="off"
            label="Re-enter Password"
            variant="outlined"
            type="password"
            onChange={(event) => {
              setCheckRegisterPassword(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />
          <TextField
            id="fullName"
            label="Full Name"
            variant="outlined"
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />
          <TextField
            id="sid"
            label="SID"
            variant="outlined"
            value={sid}
            onChange={(event) => {
              setSid(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />

          <TextField
            id="cgpa"
            label="CGPA"
            variant="outlined"
            value={cgpa}
            onChange={(event) => {
              setCgpa(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                onChange={(event) => {
                  setType(event.target.value);
                }}
              >
                {typeItems.map((typeItem) => (
                  <MenuItem key={typeItem} value={typeItem}>
                    <ListItemText primary={typeItem} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Button onClick={register} variant="contained">
            Signup
          </Button>
          <p>{signupErrorCode}</p>
          <div>
            Already have an account? <Link to="/login">Log In</Link> instead
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
