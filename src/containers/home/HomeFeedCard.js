import "./HomeFeedCard.css";
import React, { useState } from "react";
import moment from "moment";
import { Button, Paper } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const HomeFeedCard = ({ feedData }) => {
  return (
    <Paper className="HomeFeedCard" elevation={3} sx={{ borderRadius: "16px" }}>
      <div className="homeFeedCardHeader">
        <div>
          <div className="newJobNotificationText">Open for Applications</div>
          <div className="companyName">
            {feedData.name} - {feedData.jobProfile}
          </div>
        </div>
        <NotificationsIcon />
      </div>
      <div className="homeFeedCardBody">
        <div className="homeFeedCardDescription">
          <p>
            Applications are being accepted for <b>{feedData.name}</b>'s job
            profile: {feedData.jobProfile}
          </p>
          <p>
            Eligible students will be able to find this job profile under{" "}
            <b>JOBS</b> options, and apply.
          </p>
        </div>
        <div className="homeFeedCardEligibilitySection">
          <b>Eligible Courses</b>
          <ul>
            {feedData.eligibleCourses?.map((course) => {
              return <li key={course}>{course}</li>;
            })}{" "}
          </ul>
          <b>Eligibility Criterea</b>
          <ul>
            {feedData.eligibility &&
              Object.entries(feedData.eligibility)?.map(([criterea, value]) => {
                return (
                  <li key={criterea}>
                    {criterea}:{" "}
                    {criterea == "backlogsAllowed" ? value.toString() : value}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className="deadlineSection">
          The deadline for applications is{" "}
          {moment(feedData.deadline.seconds * 1000).format(
            "DD-MMMM-YYYY hh:mm"
          )}
        </div>
        <div className="homeFeedCardApply">
          <Button variant="contained">Apply Now</Button>
        </div>
      </div>
    </Paper>
  );
};

export default HomeFeedCard;
