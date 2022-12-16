import { Button, CircularProgress, Paper } from "@mui/material";
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

  const fetchJobDetails = async () => {
    const details = await getJobDetails(id);
    setJobDetails(details);
  };

  const applyForJob = async () => {
    try {
      await applyJobs(jobDetails.documentID);
      enqueueSnackbar("Successfully applied", { variant: "success" });
      setCompanyApplicationStatus("Applied");
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
      <div className="jobDetailsContainer">
        <div className="detailsSection">
          <h1>{jobDetails.jobProfile}</h1>
          <h2>
            {jobDetails.name} | {jobDetails.location}
          </h2>
          <hr />
          <h3>Opening Overview</h3>
          <hr />
          <table>
            <tbody>
              {/* <tr>
              <td>
                <b>Category</b>
              </td>
              <td>Tier Fantasy</td>
            </tr> */}
              <tr>
                <td>
                  <b>Job Functions</b>
                </td>
                <td>{jobDetails.jobProfile}</td>
              </tr>
              {/* <tr>
              <td>
                <b>CTC</b>
              </td>
              <td>Rs 8300000</td>
            </tr> */}
              <tr>
                <td>
                  <b>Salary Break-up</b>
                </td>
                <td>
                  <ul>
                    {jobDetails.description &&
                      Object.entries(jobDetails.description).map(
                        ([key, value]) => {
                          return (
                            <li key={key}>
                              {key} - {value}
                            </li>
                          );
                        }
                      )}
                    {/* <li>BASE PAY – {jobDetails?.description?.fixedCTC}</li>
                  <li>Restricted Stock Units – USD 75,000</li>
                  <li>SIGN-ON BONUS – INR 50,000</li> */}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <h3>About {jobDetails.name}</h3>
          <hr />
          <b>1000+ Employees | Private | Founded 2002</b>
          <h3>Job Description</h3>
          <hr />
          <p>
            We’re the global software company that makes over a dozen products
            like Jira, Bitbucket, Trello, and Confluence. We help teams of all
            sizes all over the world unleash their full potential. From coding
            and collaborating, to just getting stuff done—we’re all about
            empowering teams to innovate better and faster. Learn more about who
            we are, our growth journey and how we are changing the way teams
            work together - Development and Collaboration Software Company |
            Atlassian
          </p>
        </div>
        {/* {moment(jobDetails.deadline.seconds * 1000)} */}
        <div className="applySection">
          {companyApplicationStatus == "Apply" ? (
            <Button onClick={() => applyForJob()} variant="contained">
              {companyApplicationStatus}
            </Button>
          ) : (
            <Button onClick={() => applyForJob()} disabled variant="contained">
              {companyApplicationStatus}
            </Button>
          )}

          {/* Applications are now closed. You were not eligible to apply for this
          Job Profile */}
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
