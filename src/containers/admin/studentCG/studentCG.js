import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { fetchUsers } from "../../../api/userApi";
import { db } from "../../../firebase-config";

const StudentCG = () => {
  const [userData, setUserData] = useState([]);

  const fetchUsersData = async () => {
    const response = await fetchUsers();
    setUserData(response);
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <>
      <h1>Student CGPA</h1>
      <Table>
        <TableBody>
          {userData.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>{user.SID}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>
                  <TextField
                    size="small"
                    onKeyDown={(event) => {
                      if (event.code === "Enter") {
                        const docRef = doc(db, "users", user.id);
                        const data = {
                          cgpa: event.target.value
                        };
                        updateDoc(docRef, data)
                      }
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default StudentCG;
