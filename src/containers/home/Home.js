import "./Home.css";
import React, { useEffect, useState } from "react";
import HomeFeedCard from "./HomeFeedCard";
import { getJobs } from "../../pagination_comp";
import { Button } from "@mui/material";

const PAGE_SIZE = 2;

const Home = () => {
  const [lastDoc, setLastDoc] = useState(null);
  const [jobs, setJobs] = useState([]);

  const getMoreJobs = async (firstPage = false) => {
    const response = await getJobs(PAGE_SIZE, lastDoc);
    setLastDoc(response.lastDoc);
    if (firstPage) {
      setJobs(response.jobsList);
    } else {
      setJobs((jobs) => [...jobs, ...response.jobsList]);
    }
  };

  useEffect(() => {
    getMoreJobs(true);
  }, []);

  return (
    <div className="homeWrapperMain">
      <div className="logo">
        <img src={require("../../assets/images/pec-logo.png")} />
      </div>
      <div className="homeFeedContainer">
        {jobs.map((job) => {
          return <HomeFeedCard feedData={job} key={job.documentId} />;
        })}
        <Button onClick={() => getMoreJobs()}>Load more</Button>
      </div>
    </div>
  );
};

export default Home;
