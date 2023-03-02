import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { openInNewTab } from "../../helpers/UtilityFunctions";
import { useSelector } from "react-redux";
import "./profile.css";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarIcon from "@mui/icons-material/Star";
import { handleResumeUpload, deleteResume } from "../../api/resume";
import { useSnackbar } from "notistack";
import FileUploadIcon from "@mui/icons-material/FileUpload";

function ResumeSection({ refreshPage }) {
  const { enqueueSnackbar } = useSnackbar();
  const profileData = useSelector((state) => state.user.userData);
  const [addResumeModalOpen, setAddResumeModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resumeUploadRef = useRef();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleResumeDelete = async () => {
    if (selectedResumeId === profileData.primaryResume) {
      enqueueSnackbar("Primary resume cannot be deleted!", {
        variant: "error",
      });
      return;
    }
    try {
      await deleteResume(selectedResumeId);
      setDeleteDialogOpen(false);
      setSelectedResumeId(null);
      enqueueSnackbar("Resume deleted successfully!", { variant: "success" });
      refreshPage();
    } catch (error) {
      enqueueSnackbar("Failed to delete resume!", { variant: "error" });
    }
  };

  const uploadResume = (file, name) => {
    setIsLoading(true);
    handleResumeUpload(file, name, () => {
      setIsLoading(false);
      refreshPage();
      enqueueSnackbar("Resume uploaded successfully!", { variant: "success" });
      setAddResumeModalOpen(false);
    });
  }

  return (
    <>
      <div className="profileResumeSection">
        <div className="sectionHeaders">
          <h3>Resume</h3>
          <div>
            <IconButton onClick={() => setAddResumeModalOpen(true)}>
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
                {resume.id === profileData.primaryResume ? (
                  <></>
                ) : (
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
                )}
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
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "column",
              alignItems: "center",
              width: "400px",
            }}
          >
            <label>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  onClick={() => resumeUploadRef.current.click()}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                    fontSize: "12px",
                  }}
                  variant="contained"
                  disabled={isLoading}
                >
                  <FileUploadIcon fontSize="large" />
                  Choose File
                </Button>
              )}
            </label>
            <br />
            {file ? file.name : "No file selected"}
            <input
              type="file"
              onChange={handleChange}
              ref={resumeUploadRef}
              accept="application/pdf"
              hidden
              disabled={isLoading}
            />
            <br />
            <h3>Resume Name</h3>
            <TextField
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <br />
            <div>
              <Button
                onClick={() => setAddResumeModalOpen(false)}
                style={{ marginRight: "16px" }}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  uploadResume(file, name);
                }}
                variant="contained"
                disabled={isLoading}
              >
                Upload
              </Button>
            </div>
          </div>
          <DialogActions></DialogActions>
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
