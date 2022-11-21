import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { getJobs } from "../../api/jobsApi.js";
import JobProfile from "./jobProfiles/JobProfile.js";
import "./jobs.css";

const PAGE_SIZE = 10;

const Jobs = () => {
  const [lastDoc, setLastDoc] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const getMoreJobs = async (firstPage = false) => {
    const response = await getJobs(PAGE_SIZE, lastDoc);
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
    <div className="jobSection">
      <div className="componentWrapper">
        <div className="sectionWrapper">
          <h3 className="sectionHeading">Job Profiles</h3>
          <div className="tableWrapper">
            <table border="0" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <th>Job Profile</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>CTC</th>
                </tr>
                <tr>
                  <td colSpan="4">
                    <hr />
                  </td>
                </tr>
                <JobProfile jobData={jobs} />
                <tr>
                  <td>
                    <br />
                    {hasNextPage && (
                      <Button variant="contained" onClick={() => getMoreJobs()}>
                        Load more
                      </Button>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
