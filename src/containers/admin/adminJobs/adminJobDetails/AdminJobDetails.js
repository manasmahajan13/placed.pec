import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobDetails, listOfSelectedCandidates, listOfusersApplied } from "../../../../api/jobsApi.js";
import "./AdminJobDetails.css";
import { ReactComponent as ResumeSvg } from "../../../../assets/svg/file-icon.svg";
import { openInNewTab } from "../../../../helpers/UtilityFunctions.js";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { HeaderTableCell } from "../../../jobs/Jobs.js";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase-config.js";
import { useSnackbar } from "notistack";
import { set } from "date-fns";

function AdminJobDetails() {
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [applicants, setApplicants] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [selectedCandidateList, setSelectedCandidateList] = useState([]);
  const [selectedDialogOpen, setSelectedDialogOpen] = useState(false);
  const [offeredCandidates, setOfferedCandidates] = useState([]);

  const getApplicants = async () => {
    const applicantsList = await listOfusersApplied(id);
    const details = await getJobDetails(id);
    setApplicants(applicantsList);
    setJobDetails(details);
  };

  const getOfferedApplicants = async () => {
    const offeredList = await listOfSelectedCandidates(id);
    setOfferedCandidates(offeredList);
  }

  useEffect(() => {
    getApplicants();
  }, []);

  return (
    <div className="adminJobDetailsWrapper">
      <h1>
        {jobDetails.name} | {jobDetails.jobProfile}
      </h1>
      <div className="heading2 applicantsHeader">
        Applicants{" "}
        <Button
          onClick={() => {
            const jobDocRef = doc(db, "jobPostings", id);
            if (!selectedCandidateList.length) {
              enqueueSnackbar("No Applicant Marked as Selected!", {
                variant: "warning",
              });
            } else {
              try {
                const jobData = {
                  selectedCandidates: selectedCandidateList,
                };
                console.log(selectedCandidateList);
                updateDoc(jobDocRef, jobData);
                selectedCandidateList.forEach((candidate) => {
                  const candidateDocRef = doc(db, "users", candidate);
                  const candidateData = {
                    selectedCompany: id,
                  };
                  updateDoc(candidateDocRef, candidateData);
                });
                enqueueSnackbar(
                  "Selected Candidates List Updated Sucessfully!",
                  {
                    variant: "success",
                  }
                );
              } catch (error) {
                enqueueSnackbar("Some Problem Encountered. Please try again!", {
                  variant: "error",
                });
              }
            }
          }}
        >
          Set as Selected
        </Button>
      </div>
      <TableContainer className="jobApplicantsTable">
        <Table>
          <TableHead className="applicantsHeader">
            <TableRow>
              <HeaderTableCell> </HeaderTableCell>
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
                  <TableCell>
                    <Checkbox
                      value={selectedCandidateList.find(
                        (c) => c === applicant.id
                      )}
                      onClick={(event, index) => {
                        if (event.target.checked) {
                          setSelectedCandidateList([
                            ...selectedCandidateList,
                            applicant.id,
                          ]);
                        } else {
                          const filteredList = selectedCandidateList.filter(
                            (c) => c != applicant.id
                          );
                          setSelectedCandidateList(filteredList);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{applicant.fullName}</TableCell>
                  <TableCell>{applicant.cgpa}</TableCell>
                  <TableCell>
                    <ResumeSvg
                      height="20px"
                      width="20px"
                      onClick={() =>{
                        openInNewTab(applicant.resume)}}
                      style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        onClick={ async () => {
          await getOfferedApplicants();
          setSelectedDialogOpen(true);
        }}
        style={{ margin: "16px 0px" }}
      >
        View Selected Candidates
      </Button>
      <Dialog
        open={selectedDialogOpen}
        fullWidth
        onClose={() => {
          setSelectedDialogOpen(false);
        }}
      >
        <DialogTitle>
          <div className="heading2">Selected Candidates</div>
        </DialogTitle>
        <DialogContent>
          <TableContainer className="jobApplicantsTable">
            <Table>
              <TableHead className="applicantsHeader">
                <TableRow>
                  <HeaderTableCell>SID</HeaderTableCell>
                  <HeaderTableCell>Name</HeaderTableCell>
                  <HeaderTableCell>CGPA</HeaderTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applicants.length == 0 && (
                  <TableRow className="applicantRow">
                    <TableCell colSpan={3} align="center">
                      None Selected
                    </TableCell>
                  </TableRow>
                )}
                {
                applicants
                  .filter((applicant) =>
                    offeredCandidates.includes(applicant.id)
                  )
                  .map((applicant) => {
                    return (
                      <TableRow className="applicantRow" key={applicant.id}>
                        <TableCell>{applicant.SID}</TableCell>
                        <TableCell>{applicant.fullName}</TableCell>
                        <TableCell>{applicant.cgpa}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminJobDetails;
