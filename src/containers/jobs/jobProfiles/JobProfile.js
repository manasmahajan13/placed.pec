import { TableCell, TableRow } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./jobProfile.css";

export default function JobProfile({ jobData }) {
  const navigate = useNavigate();
  return (
    <>
      {jobData?.map((job) => (
        <TableRow
          className="jobRow"
          key={`${job.name}${job.jobProfile}`}
          onClick={() => navigate(`/jobs/${job.documentID}`)}
        >
          <TableCell className="jobDataElement">{job.jobProfile}</TableCell>
          <TableCell className="jobDataElement">{job.name}</TableCell>
          <TableCell className="jobDataElement">{job.location}</TableCell>
          <TableCell className="jobDataElement">
            {job.description.fixedCTC}
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
