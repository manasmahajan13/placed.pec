import React from "react";
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

export default function PlacementCycle() {
  const navigate = useNavigate();
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
            temp
            <TableRow>
              <TableCell></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
