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
import { getProfile } from "../../api/profileApi";
import ResumeUpload from "../../api/resume";
import { openInNewTab } from "../../helpers/UtilityFunctions";
import "./profile.css";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [editSummaryOpen, setEditSummaryOpen] = useState(false);

  const handleEditSummaryClose = () => {
    setEditSummaryOpen(false);
  };

  const getProfileData = async () => {
    const data = await getProfile();
    setProfileData(data);
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="profilePage">
      <div className="profileWrapper">
        <div className="profileContent">
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
            <b>PEC UNIVERSITY OF TECHNOLOGY</b>
          </div>
          <hr />
          <h3>Summary</h3>
          <div className="summarySection">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div>
              <Button onClick={() => setEditSummaryOpen(true)}>Edit</Button>
            </div>
          </div>
          <h3>Resume</h3>
          {profileData.urlResume ? (
            <Button
              onClick={() => openInNewTab(profileData.urlResume)}
              variant="contained"
            >
              Resume
            </Button>
          ) : (
            <ResumeUpload />
          )}
        </div>
        {/* <div className="sideMenuBar">
          <div className="sideMenuBarItems">Profile</div>
          <div className="sideMenuBarItems">Summary</div>
          <div className="sideMenuBarItems">Education</div>
          <div className="sideMenuBarItems">Internships & Work Experience</div>
          <div className="sideMenuBarItems">Technical Skills</div>
          <div className="sideMenuBarItems">Positions of Responsibility</div>
          <div className="sideMenuBarItems">Projects</div>
          <div className="sideMenuBarItems">Subjects</div>
          <div className="sideMenuBarItems">Communication Languages</div>
          <div className="sideMenuBarItems">Accomplishments</div>
          <div className="sideMenuBarItems">Volunteer Experiences</div>
          <div className="sideMenuBarItems">Extra Curricular Activities</div>
          <div className="sideMenuBarItems">My Resumes</div>
          <div className="sideMenuBarItems">My Documents</div>
        </div> */}
      </div>
      <Dialog open={editSummaryOpen} onClose={handleEditSummaryClose}>
        <DialogTitle>Edit Summary</DialogTitle>
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
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditSummaryClose}>Cancel</Button>
          <Button onClick={handleEditSummaryClose}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
