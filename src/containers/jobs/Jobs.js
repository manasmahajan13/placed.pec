import React from "react";
import JobProfile from "./jobProfiles/JobProfile.js";
import "./jobs.css"

const Jobs = () => {
  const jobData = [
    {
      jobProfile: "SDE",
      companyName: "Amazon",
      location: "Gurgaon",
      status: "Selected"
    },
    {
      jobProfile: "SDE-I",
      companyName: "Flipkart",
      location: "Bangalore",
      status: "Applied"
    },
    {
      jobProfile: "Analyst",
      companyName: "Morgan Stanley",
      location: "Remote",
      status: "Clossed for Application"
    },
    {
      jobProfile: "SDE",
      companyName: "KPMG",
      location: "Gurgaon",
      status: "Not Eligible"
    },
    {
      jobProfile: "Data Analyst",
      companyName: "Amazon",
      location: "Gurgaon",
      status: "Not Eligible"
    },
    {
      jobProfile: "Operations",
      companyName: "Microsoft",
      location: "Hyderabad",
      status: "Applied"
    },
    {
      jobProfile: "SDE",
      companyName: "Nucleus Software Exports",
      location: "Noida",
      status: "Open for Applications"
    },
    {
      jobProfile: "Data Analyst",
      companyName: "EXL",
      location: "Mumbai/Pune",
      status: "Applied"
    },
    {
      jobProfile: "Consultancy",
      companyName: "McKinsey",
      location: "Gurgaon",
      status: "Not Selected"
    },
    {
      jobProfile: "Data Engineer",
      companyName: "Mathworks",
      location: "Noida",
      status: "Not Eligible"
    },
    {
      jobProfile: "Graduate Engineer",
      companyName: "Exxon Mobile",
      location: "Gurgaon",
      status: "Not Selected"
    },
    {
      jobProfile: "Software",
      companyName: "Google",
      location: "Gurgaon/Bangaluru",
      status: "Applied"
    },
    {
      jobProfile: "Electrical Engineer",
      companyName: "Texas Instumental",
      location: "Gurgaon",
      status: "# Not Eligible"
    },
    {
      jobProfile: "SDE",
      companyName: "Amazon",
      location: "Gurgaon",
      status: "# Not Eligible"
    },
    {
      jobProfile: "Software Manager",
      companyName: "Byju's",
      location: "Ahemedabad",
      status: "Offered"
    }
  ]
  return (
    <div className="jobSection">
      <div className="componentWrapper">
        <div className="sectionWrapper">
          <h3 className="sectionHeading">Job Profiles</h3>
          <div className="tableWrapper">
          <table>
            <tr>
              <th>Job Profile</th>
              <th>Company</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
            <tr><td colspan="4"> <hr /> </td></tr>
            <JobProfile jobData={jobData}/>
          </table>
          </div>
          
          {/* <div className="header">
            <div>Job Profile</div>
            <div>Company</div>
            <div>Location</div>
            <div>Status</div>
          </div>
          <br></br>
          <div className="jobDataWrapper2">
            <JobProfile jobData={jobData}/>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default Jobs;
