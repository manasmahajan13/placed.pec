import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  CircularProgress,
  DialogContentText,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { openInNewTab } from "../../helpers/UtilityFunctions";
import { useSelector } from "react-redux";
import "./profile.css";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import StarIcon from "@mui/icons-material/Star";
import {
  handleResumeUpload,
  deleteResume,
  starResume,
  handleEditResumeName,
} from "../../api/resume";
import { useSnackbar } from "notistack";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { EditOutlined } from "@mui/icons-material";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase-config";

function ResumeSection({ refreshPage }) {
  const { enqueueSnackbar } = useSnackbar();
  const profileData = useSelector((state) => state.user.userData);
  const [editResumeNameModalOpen, setEditResumeNameModalOpen] = useState(false);
  const [addResumeModalOpen, setAddResumeModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [starResumeId, setStarResumeId] = useState(profileData.primaryResume);
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const resumeUploadRef = useRef();

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  useEffect(() => {
    setStarResumeId(profileData.primaryResume);
  }, [profileData]);

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
    try {
      handleResumeUpload(file, name, () => {
        refreshPage();
        enqueueSnackbar("Resume uploaded successfully!", {
          variant: "success",
        });
        setAddResumeModalOpen(false);
      });
    } catch (error) {}
    setIsLoading(false);
    setFile("");
    setName("");
  };

  const EditResumeName = async () => {
    try {
      await handleEditResumeName(name, selectedResumeId, async () => {
        await refreshPage();
        enqueueSnackbar("Resume name updated successfully.", {
          variant: "success",
        });
        setEditResumeNameModalOpen(false);
        setSelectedResumeId("");
        setName("");
      });
    } catch {
      enqueueSnackbar("Cannot Update Resume Name.", {
        variant: "error",
      });
    }
  };

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
              <div
                className="resumeRow"
                key={resume.id}
                style={{ display: "flex" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                  onClick={() => openInNewTab(resume.url)}
                >
                  <IconButton>
                    <AssignmentOutlinedIcon fontSize="large" />
                  </IconButton>
                  <span>{resume.name}</span>
                  {resume.id === starResumeId && <StarIcon fontSize="small" />}
                </div>
                {resume.id === starResumeId ? (
                  <></>
                ) : (
                  <>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          setEditResumeNameModalOpen(true);
                          setSelectedResumeId(resume.id);
                          setName(resume.name);
                        }}
                      >
                        <EditOutlined></EditOutlined>
                      </IconButton>
                      <Button
                        style={{ paddingLeft: "12px", paddingRight: "16px" }}
                        onClick={() => {
                          try {
                            starResume(resume.id);
                            setStarResumeId(resume.id);
                            enqueueSnackbar("Primary Resume Updated!", {
                              variant: "success",
                            });
                          } catch (error) {
                            enqueueSnackbar("Error updating Primary Resume!", {
                              variant: "error",
                            });
                          }
                        }}
                      >
                        Star Mark
                      </Button>
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
                  </>
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
      <Dialog
        open={editResumeNameModalOpen}
        onClose={() => {
          setEditResumeNameModalOpen(false);
          setName("");
        }}
      >
        <DialogTitle>Edit Resume Name</DialogTitle>
        <DialogContent>
            <br />
            <DialogContentText>Enter new name</DialogContentText>
            <br></br>
            <TextField
            autoFocus
            id="summary"
            multiline
            sx={{ width: "400px" }}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
              </DialogContent>
            <br />
            <DialogActions>
              <Button
                onClick={() => {
                  setEditResumeNameModalOpen(false);
                  setName("");
                  setSelectedResumeId(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  EditResumeName();
                }}
                variant="contained"
              >
                Save
              </Button>
            </DialogActions>
      </Dialog>
    </>
  );
}

export default ResumeSection;
