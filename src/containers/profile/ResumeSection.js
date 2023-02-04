import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { openInNewTab } from "../../helpers/UtilityFunctions";
import { useSelector } from "react-redux";
import "./profile.css";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarIcon from "@mui/icons-material/Star";
import { handleResumeUpload, deleteResume } from "../../api/resume";

function ResumeSection() {
  const profileData = useSelector((state) => state.user.userData);
  const [addResumeModalOpen, setAddResumeModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [file, setFile] = useState("");
  const [name, setName] = useState("");

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleResumeDelete = () => {
    if (selectedResumeId === profileData.primaryResume) {
      //notification
      return;
    }
    deleteResume(selectedResumeId);
    setDeleteDialogOpen(false);
    setSelectedResumeId(null);
  };
  return (
    <>
      <div className="profileResumeSection">
        <div className="sectionHeaders">
          <h3>Resume</h3>
          <div>
            <IconButton
              color="primary"
              onClick={() => setAddResumeModalOpen(true)}
            >
              <PostAddOutlinedIcon />
            </IconButton>
          </div>
        </div>

        {profileData.resume?.length ? (
          profileData.resume.map((resume) => {
            return (
              <div className="resumeRow" key={resume.id}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => openInNewTab(resume.url)}>
                    <AssignmentOutlinedIcon fontSize="large" />
                  </IconButton>
                  <span>{resume.name}</span>
                  {resume.id === profileData.primaryResume && (
                    <StarIcon fontSize="small" />
                  )}
                </div>
                <div>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setDeleteDialogOpen(true);
                      setSelectedResumeId(resume.id);
                    }}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </div>
              </div>
            );
          })
        ) : (
          <div>You haven't uploaded a resume</div>
        )}
      </div>
      <Dialog
        open={addResumeModalOpen}
        onClose={() => setAddResumeModalOpen(false)}
      >
        <DialogTitle>Add Resume</DialogTitle>
        <DialogContent>
          <TextField
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            label="Resume Name"
          />
          <div>
            <input
              type="file"
              onChange={handleChange}
              accept="application/pdf"
            />
          </div>
          <Button onClick={() => handleResumeUpload(file, name)}>
            Upload File
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setSelectedResumeId(null);
        }}
      >
        <DialogTitle>Are you sure you wish to delete this resume?</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setDeleteDialogOpen(false);
              setSelectedResumeId(null);
            }}
          >
            No
          </Button>
          <Button onClick={handleResumeDelete}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ResumeSection;
