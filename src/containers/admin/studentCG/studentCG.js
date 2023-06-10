import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  TableContainer,
  TableHead,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { useSnackbar } from "notistack";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { fetchUsers } from "../../../api/userApi";
import { db } from "../../../firebase-config";
import { HeaderTableCell } from "../../jobs/Jobs";
import { branchMappings } from "../../profile/Profile";
import { coursesList } from "../adminJobs/CreateJobPosting";
import "./studentCG.css";

const StudentCG = () => {
  const [userData, setUserData] = useState([]);
  const [cgpaUpdateMessage, setCgpaUpdateMessage] = useState("");
  const [branch, setBranch] = useState(coursesList[0]);
  const inputRefs = useRef([]);
  const { enqueueSnackbar } = useSnackbar();

  const fetchUsersData = async () => {
    const response = await fetchUsers();
    const filteredUsers = response.filter(
      (user) =>
        branchMappings[user.SID.substring(2, 5)]?.toLowerCase() ==
        branch?.toLowerCase()
    );
    setUserData(filteredUsers);
  };

  useEffect(() => {
    fetchUsersData();
  }, [branch]);

  return (
    <div className="studentGradesContainer">
      <div className="studentGradesHeader">
        <h1>Student Grades</h1>
      </div>
      <InputLabel id="branch-label">Branch</InputLabel>
      <Select
        labelId="branch-label"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
        size="small"
      >
        {coursesList.map((course) => {
          return (
            <MenuItem value={course} key={course}>
              {course}
            </MenuItem>
          );
        })}
      </Select>
      <TableContainer
        sx={{
          maxHeight: "calc(100vh - 66px - 60px)",
          backgroundColor: "white",
          borderRadius: "4px",
          margin: "16px 0px",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <HeaderTableCell>Student ID</HeaderTableCell>
              <HeaderTableCell>Name</HeaderTableCell>
              <HeaderTableCell align="right">CGPA</HeaderTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.length == 0 && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
            {userData.map((user, index) => {
              return (
                <TableRow key={user.id}>
                  <TableCell className="tableCell">{user.SID}</TableCell>
                  <TableCell className="tableCell">{user.fullName}</TableCell>
                  <TableCell align="right" className="tableCell">
                    <TextField
                      size="small"
                      inputRef={(ref) => (inputRefs.current[index] = ref)}
                      sx={{ width: "100px" }}
                      placeholder={user.cgpa}
                      onKeyDown={(event) => {
                        if (event.code === "Enter") {
                          const re = /^\d+(\.\d{1,2})?$/;
                          if (event.target.value === "" || re.test(event.target.value)) {
                          } else {
                            enqueueSnackbar("CGPA must lie in the range 1.0 to 10.0. Maximum 2 decimal places allowed.", {variant: "info"});
                            enqueueSnackbar(
                              "Please Enter a valid CGPA.", {variant: "error"}
                            );
                            return;
                          }
                          if (event.target.value < 1.0 || event.target.value > 10.0) {
                            enqueueSnackbar("CGPA must lie in the range 1.0 to 10.0. Maximum 2 decimal places allowed.", {variant: "info"});
                            enqueueSnackbar(
                              "Please Enter a valid CGPA.", {variant: "error"}
                            );
                            return;
                          }
                          try {
                            const docRef = doc(db, "users", user.id);
                            const data = {
                              cgpa: event.target.value,
                            };
                            updateDoc(docRef, data);
                            enqueueSnackbar(
                              "CGPA updated for " +
                                user.SID +
                                " " +
                                user.fullName +
                                " successfully!",
                              { variant: "success" }
                            );
                            inputRefs.current[index + 1].focus();
                          } catch (error) {
                            enqueueSnackbar(
                              "Error updating CGPA for " +
                                user.SID +
                                " " +
                                user.fullName,
                              { variant: "error" }
                            );
                            return;
                          }
                        }
                      }}
                    />
                  </TableCell>
                  {/* <TableCell>{cgpaUpdateMessage}</TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StudentCG;
