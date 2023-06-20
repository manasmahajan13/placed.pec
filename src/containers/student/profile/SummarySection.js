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
import { updateProfile } from "../../../api/profileApi";
import { useSelector } from "react-redux";
import "./profile.css";

import EditIcon from "@mui/icons-material/Edit";
import { useSnackbar } from "notistack";

function SummarySection({ refreshPage }) {
  const {enqueueSnackbar}=  useSnackbar()
  const profileData = useSelector((state) => state.user.userData);
  const [editSummaryOpen, setEditSummaryOpen] = useState(false);
  const [summaryUpdateText, setSummaryUpdateText] = useState("");

  const handleUpdateSummary = async () => {
    try {
      await updateProfile({ summary: summaryUpdateText });
      await refreshPage();
      enqueueSnackbar("Summary updated successfully", { variant: "success" });
      setSummaryUpdateText("");
      setEditSummaryOpen(false);
    } catch (error) {
      enqueueSnackbar("Failed to update summary", { variant: "error" });
    }
  };

  return (
    <>
      <div className="profileSummarySection">
        <div className="sectionHeaders">
          <h3>Summary</h3>
          <div>
            {profileData.summary && (
              <IconButton
                onClick={() => {
                  setEditSummaryOpen(true);
                  setSummaryUpdateText(profileData.summary);
                }}
              >
                <EditIcon />
              </IconButton>
            )}
          </div>
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
      <Dialog open={editSummaryOpen} onClose={() => setEditSummaryOpen(false)}>
        <DialogTitle>
          {profileData.summary ? "Edit Summary" : "Add Summary"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your profile summary</DialogContentText>
          <br />
          <TextField
            autoFocus
            id="summary"
            multiline
            value={summaryUpdateText}
            sx={{ width: "400px" }}
            onChange={(e) => setSummaryUpdateText(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditSummaryOpen(false)}>Cancel</Button>
          <Button onClick={handleUpdateSummary}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default SummarySection;
