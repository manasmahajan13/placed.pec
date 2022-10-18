import React from "react";
import "./jobProfile.css";

export default function JobProfile({ jobData }) {
  return (
    <>
      {jobData.map((job) => (
        // <div className="jobDataWrapper">
        <tr className="jobRow">
          <td className="jobDataElement profileLink">{job.jobProfile}</td>
          <td className="jobDataElement">{job.companyName}</td>
          <td className="jobDataElement">{job.location}</td>
          <td className="jobDataElement">{job.status}</td>
        </tr>
      ))}
      <tr>
        <td colspan="4">
          <hr />
        </td>
      </tr>
    </>
  );
}
