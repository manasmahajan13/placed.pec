import React from "react";
import "./CreatePlacementCycle.css";
import { Button, Grid, TextField } from "@mui/material";
import { createPlacementCycle } from "../../../api/placementCycleApi";
import { useState } from "react";

export default function CreatePlacementCycle() {
  const [batch, setBatch] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [createPlacementCycleStatusCode, setCreatePlacementCycleStatusCode] =
    useState("");

  const submitData = () => {
    try {
      const data = {
        batch: batch,
        year: year,
        type: type,
        jobPostings: {},
        users: "Not Verified",
      };
      createPlacementCycle(data);
      setCreatePlacementCycleStatusCode(
        "Placement Cycle Created Successfully."
      );
    } catch (error) {
      setCreatePlacementCycleStatusCode(error);
    }
  };

  return (
    <div className="newPlacementCycleWrapper">
      <div className="newPlacementCycleHeader">
        <div className="title">Create Placement Cycle</div>
      </div>
      <div className="newPlacementCycleBody">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h3>Batch</h3>
            <TextField
              id="Batch"
              variant="outlined"
              size="small"
              onChange={(event) => {
                setBatch(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <h3>Year</h3>
            <TextField
              id="year"
              variant="outlined"
              size="small"
              onChange={(event) => {
                setYear(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <h3>Type</h3>
            <TextField
              id="type"
              variant="outlined"
              size="small"
              onChange={(event) => {
                setType(event.target.value);
              }}
            />
          </Grid>
        </Grid>
        <br />
        <Button variant="contained" onClick={submitData}>
          Submit
        </Button>
        <p className="statusCode">{createPlacementCycleStatusCode}</p>
      </div>
    </div>
  );
}
