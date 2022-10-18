import "./Home.css";
import React from "react";
import HomeFeedCard from "./HomeFeedCard";

const dummyFeed = [
  {
    id: "1",
    postedBy: "Head CDGC",
    companyName: "Microsoft",
    jobProfile: "Software Development Engineer",
    applicableCourses: [
      "Computer Science Engineering",
      "Electronics and Communations Engineering",
      "Electrical Engineering",
    ],
    eligibility: {
      minCgpa: 6.95,
      backlogsAllowed: "false",
    },
    process: [
      {
        name: "Pre-placement talk",
      },
      {
        name: "Online Test",
        details: {
          venue: "Online",
          startTime: "September 30, 08:00 PM",
        },
      },
      {
        name: "Interviews",
        details: {
          venue: "Online",
          startTime: "October 5, 11:00 AM",
        },
      },
    ],
    deadline: "September 28, 08:00 PM",
  },
  {
    id: "2",
    postedBy: "Head CDGC",
    companyName: "JP Morgan & Chase",
    jobProfile: "Software Engineer",
    applicableCourses: [
      "Computer Science Engineering",
      "Electronics and Communations Engineering",
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineerig",
    ],
    eligibility: {
      minCgpa: 6.95,
      backlogsAllowed: "true",
    },
    process: [
      {
        name: "Pre-placement talk",
      },
      {
        name: "Online Test",
        details: {
          venue: "Online",
          startTime: "September 30, 08:00 PM",
        },
      },
      {
        name: "Interviews",
        details: {
          venue: "Online",
          startTime: "October 5, 11:00 AM",
        },
      },
    ],
    deadline: "September 28, 08:00 PM",
  },
];

const Home = () => {
  return (
    <div className="homeWrapperMain">
      {/* <div className="logo">
        <img src={require("../../assets/images/pec-logo.png")} />
      </div> */}
      <div className="homeFeedContainer">
        {dummyFeed.map((feed) => {
          return <HomeFeedCard feedData={feed} key={feed.id} />;
        })}
      </div>
    </div>
  );
};

export default Home;
