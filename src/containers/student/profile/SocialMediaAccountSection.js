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
import React, { useState } from "react";
import { getProfile, updateProfile } from "../../../api/profileApi";
import "./profile.css";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";

function SocialMediaAccountSection( {refreshPage} ) {
  const [addLinkedInOpen, setAddLinkedInOpen] = useState(false);
  const [linkedinUpdateText, setLinkedinUpdateText] = useState("");
  const profileData = useSelector((state) => state.user.userData);
  const handleUpdateLinkedIn = async () => {
    updateProfile({ linkedin: linkedinUpdateText });
    getProfile();
    await refreshPage();
    setLinkedinUpdateText("");
    setAddLinkedInOpen(false);
  };
  return (
    <>
    <div className="profileSummarySection">
        <div className="sectionHeaders">
          <h3>Social Media Accounts and Profiles</h3>
          </div>
      {profileData.linkedin ? (
        <div>
          <a href={profileData.linkedin}>{profileData.linkedin}</a>
          <IconButton
            onClick={() => {
              setAddLinkedInOpen(true);
              setLinkedinUpdateText(profileData.linkedin);
            }}
          >
            <EditIcon />
          </IconButton>
        </div>
        
      )
       : (
        <div>
          <Button onClick={() => setAddLinkedInOpen(true)}>
            Add you linkedIn account
          </Button>
        </div>
      )}
      </div>
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
    </>
  );
}

export default SocialMediaAccountSection;
