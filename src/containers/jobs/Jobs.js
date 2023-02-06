import {
  Button,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState, useEffect } from "react";
import { getJobs } from "../../api/jobsApi.js";
import JobProfile from "./jobProfiles/JobProfile.js";
import "./jobs.css";

const PAGE_SIZE = 20;

export const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--accent)",
    color: "var(--primary-inverted)",
    fontWeight: "600",
  },
}));

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
        <TableContainer sx={{ maxHeight: "calc(100vh - 66px)" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <HeaderTableCell>Job Profile</HeaderTableCell>
                <HeaderTableCell>Company</HeaderTableCell>
                <HeaderTableCell>Location</HeaderTableCell>
                <HeaderTableCell>CTC</HeaderTableCell>
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
    </div>
  );
};

export default Jobs;
