import React, { useEffect, useState } from "react";
import "./placementCycle.css";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { HeaderTableCell } from "../../jobs/Jobs";
import { placementCycleListing } from "../../../api/placementCycleApi";

export default function PlacementCycle() {
  const navigate = useNavigate();
  const [cycleList, setCycleList] = useState([]);

  const fetchOnLoad = async () => {
    try {
      const response = await placementCycleListing();
      setCycleList(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchOnLoad();
  }, []);
  return (
    <div className="jobsAdmin">
      <div className="jobsAdminHeader">
        <h2>Existing Placement Cycles</h2>
        <Button
          onClick={() => navigate("/admin/placementCycle/create-new")}
          variant="contained"
        >
          New
        </Button>
      </div>
      <TableContainer
        sx={{
          maxHeight: "calc(100vh - 66px - 60px)",
          backgroundColor: "white",
          borderRadius: "4px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <HeaderTableCell>Batch Year</HeaderTableCell>
              <HeaderTableCell>Stream</HeaderTableCell>
              <HeaderTableCell>Type</HeaderTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cycleList.map((item) => {
              return (
                <TableRow>
                  <TableCell>{item.year}</TableCell>
                  <TableCell>{item.batch}</TableCell>
                  <TableCell>{item.type}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
