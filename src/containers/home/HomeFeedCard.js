import "./HomeFeedCard.css";
import React, { useState } from "react";

const HomeFeedCard = ({ feedData }) => {
  return (
    <div className="HomeFeedCard">
      <div className="homeFeedCardHeader">
        <div className="feedCardAvatar">HC</div>
        <div>
          <div>
            <b>
              Open for Applications - {feedData.companyName} -{" "}
              {feedData.jobProfile}
            </b>
          </div>
          <div>{feedData.postedBy}</div>
        </div>
      </div>
      <p>
        Applications are being accepted for <b>{feedData.companyName}</b>'s job
        profile: {feedData.jobProfile}
      </p>
      <p>
        Eligible students will be able to find this job profile under{" "}
        <b>JOBS</b> options, and apply.
      </p>
      <b>Applicable Course</b>
      <ol>
        {feedData.applicableCourses.map((course) => {
          return <li>{course}</li>;
        })}{" "}
      </ol>
      <b>Eligibility</b>
      <ol>
        {Object.entries(feedData.eligibility).map(([criterea, value]) => {
          return (
            <li>
              {criterea}: {value}
            </li>
          );
        })}
      </ol>
      <b>Hiring Process - Stages</b>
      <ol>
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
      </ol>
      <b className="deadlineText">
        The deadline for applications is {feedData.deadline}
      </b>
    </div>
  );
};

export default HomeFeedCard;
