import "./Home.css";
import React, { useEffect, useState } from "react";
import HomeFeedCard from "./HomeFeedCard";
import { CompanyDataRetrieval } from "../../pagination_comp";

const PAGE_SIZE = 2;
const Home = () => {
  const [pageNo, setPageNo] = useState(0);
  const [jobs, setJobs] = useState([]);

  const getJobs = async () => {
    const jobsList = await CompanyDataRetrieval(PAGE_SIZE, pageNo);
    setJobs(jobsList);
  };

  useEffect(() => {
    getJobs();
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
      </div>
    </div>
  );
};

export default Home;
