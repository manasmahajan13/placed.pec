import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobDetails, listOfusersApplied } from "../../../../api/jobsApi.js";
import "./AdminJobDetails.css";
import { ReactComponent as ResumeSvg } from "../../../../assets/svg/file-icon.svg";
import { openInNewTab } from "../../../../helpers/UtilityFunctions.js";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

function AdminJobDetails() {
  const { id } = useParams();

  const [applicants, setApplicants] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);

  const getApplicants = async () => {
    const applicantsList = await listOfusersApplied(id);
    const details = await getJobDetails(id);
    setApplicants(applicantsList);
    setJobDetails(details);
  };

  useEffect(() => {
    getApplicants();
  }, []);

  return (
    <div>
      <h1>{jobDetails.name}</h1>
      <h2>Applicants</h2>
      <Table>
        <TableHead className="applicantsHeader">
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>CGPA</TableCell>
            <TableCell>Resume</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applicants.map((applicant) => {
            return (
              <TableRow className="applicantRow" key={applicant.id}>
                <TableCell>{applicant.name}</TableCell>
                <TableCell>{applicant.cgpa}</TableCell>
                <TableCell>
                  <ResumeSvg
                    height="20px"
                    width="20px"
                    onClick={() => openInNewTab(applicant.resume)}
                    style={{ cursor: "pointer" }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminJobDetails;
