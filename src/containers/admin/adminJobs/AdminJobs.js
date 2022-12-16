import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../../api/jobsApi.js";
import "./AdminJobs.css";

const PAGE_SIZE = 10;

function JobProfile({ jobData }) {
  const navigate = useNavigate();
  return (
    <>
      {jobData?.map((job) => (
        <tr
          key={`${job.name}${job.jobProfile}`}
          onClick={() => navigate(`/admin/jobs/${job.documentID}`)}
          className="adminJobRow"
        >
          <td>{job.name}</td>
          <td>{job.jobProfile}</td>
        </tr>
      ))}
    </>
  );
}

const AdminJobs = () => {
  const navigate = useNavigate();
  const [lastDoc, setLastDoc] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const getMoreJobs = async (firstPage = false) => {
    const response = await getAllJobs(PAGE_SIZE, lastDoc);
    setLastDoc(response.lastDoc);
    if (firstPage) {
      setJobs(response.jobsList);
    } else {
      setJobs((jobs) => [...jobs, ...response.jobsList]);
    }
    if (response.jobsList == null || response.jobsList.length < PAGE_SIZE) {
      setHasNextPage(false);
    }
  };

  useEffect(() => {
    getMoreJobs(true);
  }, []);
  return (
    <div className="jobsAdmin">
      <div className="jobsAdminHeader">
        <h3>Job Profiles</h3>
        <div className="createJobButton">
          <Button
            onClick={() => navigate("/admin/jobs/create-new")}
            variant="contained"
          >
            New
          </Button>
        </div>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Company</th>
            <th>Job Profile</th>
          </tr>
          <tr>
            <td colSpan="2">
              <hr />
            </td>
          </tr>
          <JobProfile jobData={jobs} />
        </tbody>
      </table>
      <div className="loadMoreButtonAdminJobs">
        {hasNextPage && (
          <Button variant="contained" onClick={() => getMoreJobs()}>
            Load more
          </Button>
        )}
      </div>
    </div>
  );
};

export default AdminJobs;
