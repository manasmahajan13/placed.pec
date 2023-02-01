import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profileApi";
import { openInNewTab } from "../../helpers/UtilityFunctions";
import { useSelector, useDispatch } from "react-redux";
import "./profile.css";
import { setUserData } from "../../redux/slice/user.slice";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import handleResumeUpload from "../../api/resume";

const Profile = () => {
  const profileData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [addLinkedInOpen, setAddLinkedInOpen] = useState(false);
  const [editSummaryOpen, setEditSummaryOpen] = useState(false);
  const [addResumeModalOpen, setAddResumeModalOpen] = useState(false);
  const [summaryUpdateText, setSummaryUpdateText] = useState("");
  const [linkedinUpdateText, setLinkedinUpdateText] = useState("");
  const [file, setFile] = useState("");
  const [name, setName] = useState("");

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleUpdateSummary = () => {
    updateProfile({ summary: summaryUpdateText });
    getProfileData();
    setSummaryUpdateText("");
    setEditSummaryOpen(false);
  };

  const handleUpdateLinkedIn = () => {
    updateProfile({ linkedin: linkedinUpdateText });
    getProfileData();
    setLinkedinUpdateText("");
    setAddLinkedInOpen(false);
  };

  const getProfileData = async () => {
    const data = await getProfile();
    dispatch(setUserData(data));
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="profilePage">
      <div className="profileContent">
        <div className="profileSection">
          <div className="profileContentHeader">
            <div>
              <img
                src={require("../../assets/images/placeholder-profile.png")}
                alt="Profile"
                className="profileImg"
              />
            </div>
            <h2>
              {profileData.fullName} · {profileData.SID}
            </h2>

            <div>
              <b>Electrical Engineering</b>
            </div>
            <div>
              <b>PEC (DEEMED TO BE UNIVERSITY)</b>
            </div>

            {profileData.linkedin ? (
              <div>
                <a href={profileData.linkedin}>{profileData.linkedin}</a>
                <Button
                  onClick={() => {
                    setAddLinkedInOpen(true);
                    setLinkedinUpdateText(profileData.linkedin);
                  }}
                >
                  Edit
                </Button>
              </div>
            ) : (
              <div>
                <Button onClick={() => setAddLinkedInOpen(true)}>
                  Add you linkedIn account
                </Button>
              </div>
            )}
          </div>
          <div className="profileSummarySection">
            <div className="sectionHeaders">
              <h3>Summary</h3>
              {profileData.summary && (
                <Button
                  onClick={() => {
                    setEditSummaryOpen(true);
                    setSummaryUpdateText(profileData.summary);
                  }}
                >
                  Edit
                </Button>
              )}
            </div>
            {profileData.summary ? (
              <div className="summarySection">
                <p>{profileData.summary}</p>
              </div>
            ) : (
              <Button
                onClick={() => {
                  setEditSummaryOpen(true);
                  setSummaryUpdateText(profileData.summary);
                }}
              >
                Add a summary
              </Button>
            )}
          </div>
        </div>
        <div className="profileSection">
          <div className="profileResumeSection">
            <div className="sectionHeaders">
              <h3>Resume</h3>
              <Button onClick={() => setAddResumeModalOpen(true)}>
                Add resume
              </Button>
            </div>

            {profileData.resume?.length
              ? profileData.resume.map((resume) => {
                  return (
                    <div className="resumeRow" key={resume.id}>
                      <div>{resume.name}</div>
                      <IconButton
                        onClick={() => openInNewTab(resume.url)}
                        variant="contained"
                      >
                        <AssignmentOutlinedIcon />
                      </IconButton>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>

      <Dialog open={editSummaryOpen} onClose={() => setEditSummaryOpen(false)}>
        <DialogTitle>
          {profileData.summary ? "Edit Summary" : "Add Summary"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your profile summary</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="summary"
            label="Summary"
            fullWidth
            variant="standard"
            multiline
            value={summaryUpdateText}
            onChange={(e) => setSummaryUpdateText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditSummaryOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateSummary}>Save</Button>
        </DialogActions>
      </Dialog>

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

      <Dialog open={addLinkedInOpen} onClose={() => setAddLinkedInOpen(false)}>
        <DialogTitle>Add LinkedIn Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your LinkedIn account details
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="linkedIn"
            label="LinkedIn URL"
            fullWidth
            variant="standard"
            multiline
            value={linkedinUpdateText}
            onChange={(e) => setLinkedinUpdateText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddLinkedInOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateLinkedIn}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
