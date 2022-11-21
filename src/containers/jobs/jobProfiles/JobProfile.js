import React from "react";
import { useNavigate } from "react-router-dom";
import "./jobProfile.css";

export default function JobProfile({ jobData }) {
  const navigate = useNavigate();
  return (
    <>
      {jobData?.map((job) => (
        // <div className="jobDataWrapper">
        <tr
          className="jobRow"
          key={`${job.name}${job.jobProfile}`}
          onClick={() => navigate(`/jobs/${job.documentID}`)}
        >
          <td className="jobDataElement">{job.jobProfile}</td>
          <td className="jobDataElement">{job.name}</td>
          <td className="jobDataElement">{job.location}</td>
          <td className="jobDataElement">{job.description.fixedCTC}</td>
        </tr>
      ))}
    </>
  );
}
