import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { createJobPosting } from "../../../api/jobsApi";
import { Timestamp } from "firebase/firestore";
import moment from "moment/moment";
import "./CreateJobPosting.css"

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
      fixed: "",
      variable: "",
    },
    eligibility: {
      minCGPA: "",
      backlogsAllowed: false,
    },
    eligibleCourses: { ...initialEligibleCoursesMap },
    usersApplied: [],
  };

  const [jobData, setJobData] = useState(initialData);

  const handleSubmission = () => {
    const jobDataToSubmit = jobData;
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

    createJobPosting(jobDataToSubmit);
  };
  return (
    <div className="newJobPostingWrapper">
      <h2>Create Job Posting</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <h3>Name</h3>
          <TextField
            id="name"
            variant="outlined"
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
            onChange={(event) => {
              setJobData({ ...jobData, location: event.target.value });
            }}
          />
        </Grid>

        <Grid item xs={6}>
          <h3>Deadline</h3>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
              renderInput={(props) => <TextField {...props} />}
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
            style={{marginRight: "16px"}}
            onChange={(event) => {
              setJobData({
                ...jobData,
                description: {
                  ...jobData.description,
                  fixed: event.target.value,
                },
              });
            }}
          />
          <TextField
            id="variable"
            label="Variable"
            variant="outlined"
            onChange={(event) => {
              setJobData({
                ...jobData,
                description: {
                  ...jobData.description,
                  variable: event.target.value,
                },
              });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <h3>Eligibility</h3>
          <TextField
            id="minCGPA"
            variant="outlined"
            label="Minimum CGPA"
            style={{marginRight: "16px"}}
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
          <Select
            labelId="backlogsAllowedLabel"
            id="backlogsAllowed"
            value={jobData.eligibility.backlogsAllowed}
            label="Backlogs allowed"
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
        </Grid>
        <Grid item xs={6}>
          <h3>Eligible Disciplines</h3>
          {coursesList.map((course) => {
            return (
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
            );
          })}
        </Grid>
      </Grid>
      <br />
      <Button onClick={handleSubmission} variant="contained">
        Submit
      </Button>
    </div>
  );
}

export default CreateJobPosting;
