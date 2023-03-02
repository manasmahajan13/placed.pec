import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
  Grid,
  Tabs,
  Tab
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { applyJobs, getJobDetails } from "../../../api/jobsApi";
import "./JobDetails.css";
import { useSnackbar } from "notistack";
import { setUserData } from "../../../redux/slice/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { getProfile } from "../../../api/profileApi";
import moment from "moment";

const JobDetails = () => {
  const profileData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const [jobDetails, setJobDetails] = useState({});
  const [companyApplicationStatus, setCompanyApplicationStatus] = useState(
    <CircularProgress size={24.5} />
  );
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedResume, setSelectedResume] = useState(false);
  const [tabValue, setTabValue] = useState("description");

  const fetchJobDetails = async () => {
    const details = await getJobDetails(id);
    setJobDetails(details);
  };

  const applyForJob = async () => {
    try {
      await applyJobs(jobDetails.documentID, selectedResume);
      enqueueSnackbar("Successfully applied", { variant: "success" });
      setCompanyApplicationStatus("Applied");
      setApplyModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getProfileData = async () => {
    const data = await getProfile();
    dispatch(setUserData(data));
  };

  const checkApplied = () => {
    if (jobDetails.documentID) {
      if (profileData.cgpa > jobDetails.eligibility.minCGPA) {
        return profileData?.statusListOfCompany?.hasOwnProperty(
          jobDetails.documentID
        )
          ? profileData.statusListOfCompany[jobDetails.documentID]
          : moment(jobDetails.deadline.seconds * 1000).isAfter()
          ? "Apply"
          : "Closed";
      } else {
        return "Not Eligible";
      }
    } else {
      return <CircularProgress size={24.5} />;
    }
  };

  const onPageLoad = async () => {
    try {
      await fetchJobDetails();
      await getProfileData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onPageLoad();
  }, []);

  useEffect(() => {
    setCompanyApplicationStatus(checkApplied());
  }, [profileData]);

  return (
    <div className="jobDetails">
      <div className="jobDetailsContainer shadowed">
        <div className="detailsSection">
          <div className="title">{jobDetails.jobProfile}</div>
          <div className="heading1">
            {jobDetails.name} | {jobDetails.location}
          </div>

          <div className="jobOverview">
            <div className="jobDetailsTabs">
              <Tabs
                value={tabValue}
                onChange={(_, value) => setTabValue(value)}
              >
                <Tab value="description" label="Job Description" />
                <Tab value="eligibility" label="Eligibility Criterea" />
              </Tabs>
            </div>
            <div className="tabContent">
              {tabValue == "description" ? (
                <div>
                  <div className="heading3 jobDetailSectionHeader">
                    Opening Overview
                  </div>
                  <Grid container>
                    <Grid item xs={4} className="textSecondary">
                      Fixed CTC
                    </Grid>
                    <Grid item xs={8}>
                      {jobDetails.description?.fixedCTC}
                    </Grid>
                    <Grid item xs={4} className="textSecondary">
                      Variable CTC
                    </Grid>
                    <Grid item xs={8}>
                      {jobDetails.description?.variableCTC}
                    </Grid>
                    <Grid item xs={4} className="textSecondary">
                      Job Functions
                    </Grid>
                    <Grid item xs={8}>
                      {jobDetails.jobProfile}
                    </Grid>
                  </Grid>
                  <div className="heading3 jobDetailSectionHeader">
                    Job Description
                  </div>
                  <div className="textSecondary">
                    {jobDetails.jobDescription
                      ? jobDetails.jobDescription
                      : "No description added"}
                  </div>
                  <div className="heading3 jobDetailSectionHeader">
                    Required Skills
                  </div>
                  <div className="textSecondary">
                    {jobDetails.skills
                      ? jobDetails.skills
                      : "No required skills added"}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="heading3 jobDetailSectionHeader">
                    Eligibility Criterea
                  </div>
                  <Grid container>
                    <Grid item xs={4} className="textSecondary">
                      Minimum CGPA
                    </Grid>
                    <Grid item xs={8}>
                      {jobDetails.eligibility?.minCGPA} CG
                    </Grid>
                    <Grid item xs={4} className="textSecondary">
                      Backlogs
                    </Grid>
                    <Grid item xs={8}>
                      {jobDetails.eligibility?.backlogsAllowed
                        ? "Backlogs allowed"
                        : "No backlogs"}
                    </Grid>
                    <Grid item xs={12} className="textSecondary">
                      Eligible Courses
                    </Grid>
                    <Grid item xs={12}>
                      {jobDetails.eligibleCourses.map(course=>{
                        return <li>{course}</li>;
                      })}
                    </Grid>
                  </Grid>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="applySection">
          <Button
            onClick={() => setApplyModalOpen(true)}
            disabled={companyApplicationStatus != "Apply"}
            variant="contained"
          >
            {companyApplicationStatus}
          </Button>
          {moment(jobDetails?.deadline?.seconds * 1000).isAfter() && (
            <div className="deadlineSection">
              Deadline:{" "}
              {moment(jobDetails?.deadline?.seconds * 1000).format(
                "DD MMMM hh:mm A"
              )}
            </div>
          )}
        </div>
      </div>
      <Dialog open={applyModalOpen} onClose={() => setApplyModalOpen(false)}>
        <DialogTitle>Apply for profile</DialogTitle>
        <DialogContent>
          <DialogContentText>Select resume</DialogContentText>
          <Select
            value={selectedResume}
            onChange={(e) => setSelectedResume(e.target.value)}
            sx={{ width: "400px" }}
            size="small"
          >
            {profileData.resume?.map((resume) => {
              return (
                <MenuItem key={resume.id} value={resume.url}>
                  {resume.name}
                </MenuItem>
              );
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApplyModalOpen(false)}>Cancel</Button>
          <Button onClick={() => applyForJob()}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default JobDetails;
