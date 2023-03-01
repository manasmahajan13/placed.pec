import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../../api/jobsApi.js";
import { HeaderTableCell } from "../../jobs/Jobs.js";
import "./AdminJobs.css";

const PAGE_SIZE = 20;

function JobProfile({ jobData }) {
  const navigate = useNavigate();
  return (
    <>
      {jobData?.map((job) => (
        <TableRow
          key={`${job.name}${job.jobProfile}`}
          onClick={() => navigate(`/admin/jobs/${job.documentID}`)}
          className="adminJobRow"
        >
          <TableCell>{job.name}</TableCell>
          <TableCell>{job.jobProfile}</TableCell>
          <TableCell>{job.applications?.length || 0}</TableCell>
        </TableRow>
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
        <h2>Job Profiles</h2>
        <Button
          onClick={() => navigate("/admin/jobs/create-new")}
          variant="contained"
        >
          New
        </Button>
      </div>
      <TableContainer sx={{ maxHeight: "calc(100vh - 66px - 60px)", backgroundColor: "white", borderRadius: "4px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <HeaderTableCell>Company</HeaderTableCell>
              <HeaderTableCell>Job Profile</HeaderTableCell>
              <HeaderTableCell>Applicants</HeaderTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <JobProfile jobData={jobs} />
            <TableRow>
              <TableCell>
                {hasNextPage && (
                  <Button variant="contained" onClick={() => getMoreJobs()}>
                    Load more
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminJobs;
