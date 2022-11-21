import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobDetails, listOfusersApplied } from "../../../../api/jobsApi.js";
import "./AdminJobDetails.css";
import { ReactComponent as ResumeSvg } from "../../../../assets/svg/file-icon.svg";
import { openInNewTab } from "../../../../helpers/UtilityFunctions.js";

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
      <table>
        <thead className="applicantsHeader">
          <tr>
            <td>Name</td>
            <td>CGPA</td>
            <td>Resume</td>
          </tr>
        </thead>
        <tbody>
          {applicants.map((applicant) => {
            return (
              <tr className="applicantRow">
                <td>{applicant.name}</td>
                <td>{applicant.cgpa}</td>
                <td>
                  <ResumeSvg
                    height="20px"
                    width="20px"
                    onClick={() => openInNewTab(applicant.resume)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminJobDetails;
