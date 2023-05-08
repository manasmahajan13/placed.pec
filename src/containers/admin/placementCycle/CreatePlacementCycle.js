import React from "react";
import "./CreatePlacementCycle.css";
import { Button, Grid, TextField } from "@mui/material";
import { createPlacementCycle } from "../../../api/placementCycleApi";
import { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CreatePlacementCycle() {
  const batchItems = ['', "B. Tech", "M. Tech", "P.H.D."];
  const typeItems = ['', "Intern", "Full Time"];
  const [batch, setBatch] = useState([]);
  const [year, setYear] = useState("");
  const [type, setType] = useState([]);
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
        <Grid container spacing={4}>
        <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Batch</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={batch}
                label="Batch"
                onChange={(event) => {
                  setBatch(event.target.value);
                }}
              >
                {batchItems.map((typeItem) => (
                  <MenuItem key={typeItem} value={typeItem}>
                    <ListItemText primary={typeItem} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
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
