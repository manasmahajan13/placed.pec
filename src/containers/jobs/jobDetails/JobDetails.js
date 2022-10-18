import { Paper } from "@mui/material";
import React from "react";
import "./JobDetails.css";

const JobDetails = () => {
  return (
    <div className="jobDetails">
      <Paper className="jobDetailsContainer">
        <div className="detailsSection">
          <h1>Software Engineer</h1>
          <h2>Atlassian | Bangalore</h2>
          <hr />
          <h3>Opening Overview</h3>
          <hr />
          <table>
            <tr>
              <td>
                <b>Category</b>
              </td>
              <td>Tier Fantasy</td>
            </tr>
            <tr>
              <td>
                <b>Job Functions</b>
              </td>
              <td>Software Engineering</td>
            </tr>
            <tr>
              <td>
                <b>CTC</b>
              </td>
              <td>Rs 8300000</td>
            </tr>
            <tr>
              <td>
                <b>Salary Break-up</b>
              </td>
              <td>
                <ul>
                  <li>BASE PAY – INR 20,80,000</li>
                  <li>Restricted Stock Units – USD 75,000</li>
                  <li>SIGN-ON BONUS – INR 50,000</li>
                </ul>
              </td>
            </tr>
          </table>
          <h3>About Atlassian</h3>
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
        <div className="applySection">
          Applications are now closed. You were not eligible to apply for this
          Job Profile
        </div>
      </Paper>
    </div>
  );
};

export default JobDetails;
