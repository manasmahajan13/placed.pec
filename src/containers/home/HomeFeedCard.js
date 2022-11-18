import "./HomeFeedCard.css";
import React, { useState } from "react";
import moment from "moment";

const HomeFeedCard = ({ feedData }) => {
  return (
    <div className="HomeFeedCard">
      <div className="homeFeedCardHeader">
        <div className="feedCardAvatar">HC</div>
        <div>
          <b>
            Open for Applications - {feedData.name} - {feedData.jobProfile}
          </b>
        </div>
      </div>
      <p>
        Applications are being accepted for <b>{feedData.name}</b>'s job
        profile: {feedData.jobProfile}
      </p>
      <p>
        Eligible students will be able to find this job profile under{" "}
        <b>JOBS</b> options, and apply.
      </p>
      <b>Applicable Course</b>
      <ol>
        {feedData.eligibleCourses?.map((course) => {
          return <li key={course}>{course}</li>;
        })}{" "}
      </ol>
      <b>Eligibility</b>
      <ol>
        {feedData.eligibility &&
          Object.entries(feedData.eligibility)?.map(([criterea, value]) => {
            return (
              <li key={criterea}>
                {criterea}: {value}
              </li>
            );
          })}
      </ol>
      {/* <b>Hiring Process - Stages</b> */}
      {/* <ol>
        {feedData.process.map((stage) => {
          return (
            <>
              <li>{stage.name}</li>
              {stage.details ? (
                <ul>
                  {Object.entries(stage.details).map(([key, value]) => {
                    return (
                      <li>
                        {key}: <b>{value}</b>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <></>
              )}
            </>
          );
        })}
      </ol> */}
      <b className="deadlineText">
        The deadline for applications is{" "}
        {moment(feedData.deadline.seconds * 1000).format("DD-MMMM-YYYY hh:mm")}
      </b>
    </div>
  );
};

export default HomeFeedCard;
