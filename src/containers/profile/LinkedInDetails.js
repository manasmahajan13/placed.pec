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
import { updateProfile } from "../../api/profileApi";
import "./profile.css";
import EditIcon from "@mui/icons-material/Edit";

function LinkedInDetails() {
  const [addLinkedInOpen, setAddLinkedInOpen] = useState(false);
  const [linkedinUpdateText, setLinkedinUpdateText] = useState("");
  const handleUpdateLinkedIn = () => {
    updateProfile({ linkedin: linkedinUpdateText });
    getProfileData();
    setLinkedinUpdateText("");
    setAddLinkedInOpen(false);
  };
  return (
    <>
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
      ) : (
        <div>
          <Button onClick={() => setAddLinkedInOpen(true)}>
            Add you linkedIn account
          </Button>
        </div>
      )}
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

export default LinkedInDetails;
