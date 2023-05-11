import "./Home.css";
import React, { useCallback, useEffect, useRef, useState } from "react";
import HomeFeedCard from "./HomeFeedCard";
import { getJobs } from "../../api/jobsApi";
import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";

const PAGE_SIZE = 4;

const Home = () => {
  const observer = useRef();
  const { enqueueSnackbar } = useSnackbar();
  const [lastDoc, setLastDoc] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setLoading] = useState(true);

  const lastItemRef = useCallback(
    (node) => {
      if (isLoading) {
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
    [isLoading]
  );

  const getMoreJobs = async (firstPage = false) => {
    setLoading(true);
    try {
      const response = await getJobs(PAGE_SIZE, lastDoc);
      setLastDoc(response.lastDoc);
      if (firstPage) {
        setJobs(response.jobsList);
        console.log(response.jobsList);
      } else {
        setJobs((jobs) => [...jobs, ...response.jobsList]);
      }
      if (response.jobsList == null || response.jobsList.length < PAGE_SIZE) {
        setHasNextPage(false);
      }
      setLoading(false);
    } catch (error) {
      enqueueSnackbar("Error fetching jobs", { variant: "error" });
      setLoading(false);
    }
  };

  useEffect(() => {
    getMoreJobs(true);
  }, []);

  return (
    <div className="homeWrapperMain">
      <div className="homeFeedContainer">
        {jobs?.map((job) => {
          return <HomeFeedCard feedData={job} key={job.documentID} />;
        })}
        <div ref={lastItemRef}></div>
        {isLoading && (
          <div className="homeLoadingIndicator">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
