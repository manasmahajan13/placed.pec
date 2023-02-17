import "./Home.css";
import React, { useEffect, useState } from "react";
import HomeFeedCard from "./HomeFeedCard";
import { getJobs } from "../../api/jobsApi";
import { Button, Skeleton } from "@mui/material";
import { useSnackbar } from "notistack";

const PAGE_SIZE = 4;

const Home = () => {
  const {enqueueSnackbar} = useSnackbar();
  const [lastDoc, setLastDoc] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isLoading, setLoading] = useState(true);

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
        {isLoading &&
          [...Array(PAGE_SIZE)].map((e, i) => (
            <Skeleton
              variant="rectangular"
              width="100%"
              height={400}
              style={{ marginBottom: "16px" }}
            />
          ))}
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
