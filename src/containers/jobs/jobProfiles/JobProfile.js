import React from "react";
import "./jobProfile.css";

export default function JobProfile({ jobData }) {
  return (
    <>
      {jobData.map((job) => (
        // <div className="jobDataWrapper">
        <tr className="jobRow" key={`${job.companyName}${job.jobProfile}`}>
          <td className="jobDataElement profileLink">{job.jobProfile}</td>
          <td className="jobDataElement">{job.companyName}</td>
          <td className="jobDataElement">{job.location}</td>
          <td className="jobDataElement">
            <b>{job.status}</b>
          </td>
        </tr>
      ))}
      <tr>
        <td colSpan="4">
          <hr />
        </td>
      </tr>
    </>
  );
}
