import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../api/profileApi";
import { useSelector, useDispatch } from "react-redux";
import "./profile.css";
import { setUserData } from "../../redux/slice/user.slice";
import ResumeSection from "./ResumeSection";

const Profile = () => {
  const profileData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [addLinkedInOpen, setAddLinkedInOpen] = useState(false);
  const [editSummaryOpen, setEditSummaryOpen] = useState(false);
  const [summaryUpdateText, setSummaryUpdateText] = useState("");
  const [linkedinUpdateText, setLinkedinUpdateText] = useState("");

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
          <ResumeSection />
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
