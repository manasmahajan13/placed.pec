import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllJobs } from "../../../api/jobsApi.js";
import { HeaderTableCell } from "../../jobs/Jobs.js";
import "./AdminJobs.css";
import { placementCycleListing } from "../../../api/placementCycleApi.js";

const PAGE_SIZE = 20;

function JobProfile({ jobData }) {
  const navigate = useNavigate();
  return (
    <>
      {jobData?.map((job) => (
        <TableRow
          key={`${job.name}${job.jobProfile}${job.placementCycleId}`}
          onClick={() => navigate(`/admin/jobs/${job.documentID}`)}
          className="adminJobRow"
        >
          <TableCell className="adminJobDataCell">{job.name}</TableCell>
          <TableCell className="adminJobDataCell">{job.jobProfile}</TableCell>
          <TableCell className="adminJobDataCell">
            {job.applications?.length || 0}
          </TableCell>
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
  const [isLoading, setIsLoading] = useState(false);
  const [cycleList, setCycleList] = useState([{}]);
  const [currentCycle, setCurrentCycle] = useState("all");

  const getMoreJobs = async (firstPage = false) => {
    setIsLoading(true);
    const response = await getAllJobs(
      PAGE_SIZE,
      firstPage ? null : lastDoc,
      currentCycle
    );
    setLastDoc(response.lastDoc);
    if (firstPage) {
      setJobs(response.jobsList);
    } else {
      setJobs((jobs) => [...jobs, ...response.jobsList]);
    }
    if (response.jobsList == null || response.jobsList.length < PAGE_SIZE) {
      setHasNextPage(false);
    }
    setIsLoading(false);
  };

  const fetchOnLoad = async () => {
    try {
      const response = await placementCycleListing();
      setCycleList(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLastDoc(null);
    getMoreJobs(true);
    fetchOnLoad();
  }, [currentCycle]);

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
      <div>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Cycle</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currentCycle}
              label="Batch"
            >
              <MenuItem value="all">
                <ListItemText
                  primary="All"
                  onClick={() => {
                    setCurrentCycle("all");
                  }}
                />
              </MenuItem>
              {cycleList.map((item, index) => (
                <MenuItem
                  key={item.year + " -- " + item.batch + " -- " + item.type}
                  value={item.id}
                >
                  <ListItemText
                    primary={
                      item.year + " -- " + item.batch + " -- " + item.type
                    }
                    onClick={() => {
                      setCurrentCycle(item.id);
                    }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </div>
      <TableContainer
        sx={{
          maxHeight: "calc(100vh - 66px - 60px - 65px)",
          backgroundColor: "white",
          borderRadius: "4px",
        }}
      >
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
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            )}
            {hasNextPage && !isLoading && (
              <TableRow>
                <TableCell>
                  <Button variant="contained" onClick={() => getMoreJobs()}>
                    Load more
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminJobs;
