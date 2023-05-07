import React from "react";
import "./CreatePlacementCycle.css";
import { Button, Grid, TextField } from "@mui/material";

export default function CreatePlacementCycle() {
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
              onChange={(event) => {}}
            />
          </Grid>
          <Grid item xs={12}>
            <h3>Degree</h3>
            <TextField
              id="Degree"
              variant="outlined"
              size="small"
              onChange={(event) => {}}
            />
          </Grid>
          <Grid item xs={12}>
            <h3>Type</h3>
            <TextField
              id="type"
              variant="outlined"
              size="small"
              onChange={(event) => {}}
            />
          </Grid>
        </Grid>
        <br />
        <Button variant="contained">Submit</Button>
      </div>
    </div>
  );
}
