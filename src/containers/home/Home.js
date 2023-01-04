import "./Home.css";
import React, { useEffect, useState } from "react";
import HomeFeedCard from "./HomeFeedCard";
import { getJobs } from "../../api/jobsApi";
import { Button } from "@mui/material";

const PAGE_SIZE = 4;

const Home = () => {
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
    <div className="homeWrapperMain">
      <div className="homeFeedContainer">
        {jobs?.map((job) => {
          return <HomeFeedCard feedData={job} key={job.documentID} />;
        })}
        {hasNextPage && (
          <Button variant="contained" onClick={() => getMoreJobs()}>
            View more
          </Button>
        )}
      </div>
    </div>
  );
};

export default Home;
