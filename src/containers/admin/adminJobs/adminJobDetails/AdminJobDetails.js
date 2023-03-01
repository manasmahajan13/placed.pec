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
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { HeaderTableCell } from "../../../jobs/Jobs.js";

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
    <div className="adminJobDetailsWrapper">
      <h1>
        {jobDetails.name} | {jobDetails.jobProfile}
      </h1>
      <h2>Applicants</h2>
      <TableContainer className="jobApplicantsTable">
        <Table>
          <TableHead className="applicantsHeader">
            <TableRow>
              <HeaderTableCell>Name</HeaderTableCell>
              <HeaderTableCell>CGPA</HeaderTableCell>
              <HeaderTableCell>Resume</HeaderTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applicants.length == 0 && (
              <TableRow className="applicantRow">
                <TableCell colSpan={3} align="center">
                  No Applicants
                </TableCell>
              </TableRow>
            )}
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
      </TableContainer>
    </div>
  );
}

export default AdminJobDetails;
