import {
  Button,
  CircularProgress,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { getJobs } from "../../api/jobsApi.js";
import { db } from "../../firebase-config.js";
import JobProfile from "./jobProfiles/JobProfile.js";
import "./jobs.css";

const PAGE_SIZE = 10;

export const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "var(--accent)",
    color: "var(--primary-inverted)",
    fontWeight: "600",
    fontSize: "18px",
  },
}));

const Jobs = () => {
  const observer = useRef();
  const [lastDoc, setLastDoc] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(true);

  const getMoreJobs = async (firstPage = false) => {
    setLoading(true);
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      let docRef = doc(db, "users", user.uid);
      let docSnap = await getDoc(docRef);
      const response = await getJobs(PAGE_SIZE, lastDoc, docSnap.data().placementCycleId);
      setJobs((prev) => [...prev, ...response.jobsList]);
      setLastDoc(response.lastDoc);
      if (firstPage) {
        setJobs(response.jobsList);
      } else {
        setJobs((jobs) => [...jobs, ...response.jobsList]);
      }
      if (response.jobsList == null || response.jobsList.length < PAGE_SIZE) {
        setHasNextPage(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMoreJobs(true);
  }, []);

  const lastItemRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (!hasNextPage) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          getMoreJobs();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading]
  );

  return (
    <div className="jobSection">
      <div className="componentWrapper shadowed">
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
              {loading &&
                [...Array(PAGE_SIZE)].map((e, i) => (
                  <TableRow>
                    <TableCell>
                      <Skeleton width="100%" height="100%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="100%" height="100%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="100%" height="100%" />
                    </TableCell>
                    <TableCell>
                      <Skeleton width="100%" height="100%" />
                    </TableCell>
                  </TableRow>
                ))}
              {hasNextPage && (
                <TableRow>
                  <TableCell>
                    <div ref={lastItemRef}></div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Jobs;
