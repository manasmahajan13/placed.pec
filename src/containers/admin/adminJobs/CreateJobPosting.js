import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Button,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { createJobPosting } from "../../../api/jobsApi";
import { Timestamp } from "firebase/firestore";
import moment from "moment/moment";
import "./CreateJobPosting.css";
import { useSnackbar } from "notistack";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import { placementCycleListing } from "../../../api/placementCycleApi";

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

export const coursesList = [
  "Computer Science Engineering",
  "Electronics and Communication Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Production Engineering",
  "Aerospace Engineering",
  "Metallurgical Engineering",
];

function CreateJobPosting() {
  const { enqueueSnackbar } = useSnackbar();
  const initialEligibleCoursesMap = {};
  coursesList.map((course) => {
    initialEligibleCoursesMap[course] = false;
  });

  const initialData = {
    name: "",
    jobProfile: "",
    location: "",
    deadline: moment(),
    description: {
      fixedCTC: "",
      variableCTC: "",
    },
    eligibility: {
      minCGPA: "",
      backlogsAllowed: false,
    },
    eligibleCourses: { ...initialEligibleCoursesMap },
    usersApplied: [],
  };

  const [jobData, setJobData] = useState(initialData);
  const [cycleList, setCycleList] = useState([]);
  const [cycleid, setCycleid] = useState("");

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
  const [eligiblePlacementCycle, setEligiblePlacementCycle] = useState([]);

  const handleSubmission = () => {
    const jobDataToSubmit = jobData;
    jobDataToSubmit.description.fixedCTC =
      jobDataToSubmit.description.fixedCTC + " LPA";
    jobDataToSubmit.description.variableCTC =
      jobDataToSubmit.description.variableCTC + " LPA";
    jobDataToSubmit.deadline = Timestamp.fromDate(
      jobDataToSubmit.deadline.toDate()
    );
    const eligibleCoursesArray = [];
    Object.entries(jobDataToSubmit.eligibleCourses).forEach(([key, value]) => {
      if (value === true) {
        eligibleCoursesArray.push(key);
      }
    });

    jobDataToSubmit.eligibleCourses = eligibleCoursesArray;
    console.log(jobDataToSubmit);
    try {
      createJobPosting(jobDataToSubmit, cycleid);
      enqueueSnackbar("Job created successfully", { variant: "success" });
      setJobData(initialData);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="newJobPostingWrapper">
      <div className="newJobPostingHeader">
        <div className="title">Create Job Posting</div>
      </div>
      <div className="newJobPostingBody">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <h3>Name</h3>
            <TextField
              id="name"
              variant="outlined"
              size="small"
              onChange={(event) => {
                setJobData({ ...jobData, name: event.target.value });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <h3>Job Profile</h3>
            <TextField
              id="jobProfile"
              variant="outlined"
              size="small"
              onChange={(event) => {
                setJobData({ ...jobData, jobProfile: event.target.value });
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <h3>Location</h3>
            <TextField
              id="location"
              variant="outlined"
              size="small"
              onChange={(event) => {
                setJobData({ ...jobData, location: event.target.value });
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <h3>Deadline</h3>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} size="small" />}
                value={jobData.deadline}
                onChange={(newValue) => {
                  setJobData({ ...jobData, deadline: newValue });
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <h3>CTC</h3>
            <TextField
              id="fixed"
              variant="outlined"
              label="Fixed"
              size="small"
              style={{ margin: "0px 16px 16px 0px" }}
              onChange={(event) => {
                setJobData({
                  ...jobData,
                  description: {
                    ...jobData.description,
                    fixedCTC: event.target.value,
                  },
                });
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">LPA</InputAdornment>
                ),
              }}
            />
            <TextField
              id="variable"
              label="Variable"
              variant="outlined"
              size="small"
              onChange={(event) => {
                setJobData({
                  ...jobData,
                  description: {
                    ...jobData.description,
                    variableCTC: event.target.value,
                  },
                });
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">LPA</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <h3>Eligibility</h3>
            <TextField
              id="minCGPA"
              variant="outlined"
              label="Minimum CGPA"
              size="small"
              style={{ margin: "0px 16px 16px 0px" }}
              onChange={(event) => {
                setJobData({
                  ...jobData,
                  eligibility: {
                    ...jobData.eligibility,
                    minCGPA: event.target.value,
                  },
                });
              }}
            />
            <div>
              <Select
                labelId="backlogsAllowedLabel"
                id="backlogsAllowed"
                value={jobData.eligibility.backlogsAllowed}
                label="Backlogs allowed"
                size="small"
                onChange={(event) => {
                  setJobData({
                    ...jobData,
                    eligibility: {
                      ...jobData.eligibility,
                      backlogsAllowed: event.target.value,
                    },
                  });
                }}
              >
                <MenuItem value={true}>Backlogs Allowed</MenuItem>
                <MenuItem value={false}>Backlogs Not Allowed</MenuItem>
              </Select>
            </div>
          </Grid>
          <Grid item xs={12}>
            <h3>Job Description</h3>
            <TextField
              id="job-description"
              label="Job Description"
              variant="outlined"
              rows={4}
              fullWidth
              multiline
              onChange={(event) => {
                setJobData({
                  ...jobData,
                  jobDescription: event.target.value,
                });
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <h3>Eligible Disciplines</h3>
            {coursesList.map((course) => {
              return (
                <div>
                  <FormControlLabel
                    label={course}
                    key={course}
                    control={
                      <Checkbox
                        checked={jobData.eligibleCourses[course]}
                        onChange={(event) => {
                          var newEligibleCourses = jobData.eligibleCourses;
                          newEligibleCourses[course] = event.target.checked;
                          setJobData({
                            ...jobData,
                            eligibleCourses: {
                              ...newEligibleCourses,
                            },
                          });
                        }}
                      />
                    }
                  />
                </div>
              );
            })}
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Eligible Placement Cycles</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={eligiblePlacementCycle}
                label="Eligible Placement Cycles"
                onChange={(event) => {
                  setEligiblePlacementCycle(event.target.value);
                }}
              >
                {cycleList.map((item) => (
                  <MenuItem key={item.year + " " + item.batch + " " + item.type} value={item.year + " " + item.batch + " " + item.type} onClick={() => {
                    setCycleid(item.id);
                  }}>
                    <ListItemText primary={item.year + " " + item.batch + " " + item.type} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <br />
        <Button onClick={handleSubmission} variant="contained">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default CreateJobPosting;
