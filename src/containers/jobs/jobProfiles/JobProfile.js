import React from "react";
import { Link } from "react-router-dom";
import "./jobProfile.css";

export default function JobProfile({ jobData }) {
  return (
    <>
      {jobData?.map((job) => (
        // <div className="jobDataWrapper">
        <tr className="jobRow" key={`${job.name}${job.jobProfile}`}>
          <td className="jobDataElement">
            <Link to={`/jobs/${job.documentID}`}>{job.jobProfile}</Link>
          </td>
          <td className="jobDataElement">{job.name}</td>
          <td className="jobDataElement">{job.location}</td>
        </tr>
      ))}
      <tr>
        <td colSpan="3">
          <hr />
        </td>
      </tr>
    </>
  );
}
