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
import ResumeUpload from "../../api/resume";
import { openInNewTab } from "../../helpers/UtilityFunctions";
import { useSelector, useDispatch } from 'react-redux';
import "./profile.css";
import { setUserData } from "../../redux/slice/user.slice";

const Profile = () => {
  const profileData = useSelector((state)=>state.user.userData);
  const dispatch = useDispatch();
  const [addLinkedInOpen, setAddLinkedInOpen] = useState(false);
  const [editSummaryOpen, setEditSummaryOpen] = useState(false);

  const handleEditSummaryClose = () => {
    setEditSummaryOpen(false);
  };
  const handleAddLinkedInClose = () => {
    setAddLinkedInOpen(false);
  };

  const getProfileData = async () => {
    const data = await getProfile();
    dispatch(setUserData(data))
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
              <a href={profileData.linkedin}>{profileData.linkedin}</a>
            ) : (
              <div>
                Add you linkedIn account{" "}
                <Button
                  variant="contained"
                  onClick={() => setAddLinkedInOpen(true)}
                >
                  LinkedIn
                </Button>
              </div>
            )}
          </div>
          <div className="profileSummarySection">
            <div className="sectionHeaders">
              <h3>Summary</h3>
              <Button onClick={() => setEditSummaryOpen(true)}>Edit</Button>
            </div>
            {profileData.summary ? (
              <div className="summarySection">
                <p>{profileData.summary}</p>
              </div>
            ) : (
              <Button
                onClick={() =>
                  updateProfile({ summary: "Hello this is a new summary" })
                }
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
            </div>

            {profileData.urlResume ? (
              <div className="resumeRow">
                <div>Resume 1</div>
                <Button
                  onClick={() => openInNewTab(profileData.urlResume)}
                  variant="contained"
                >
                  Resume
                </Button>
              </div>
            ) : (
              <ResumeUpload />
            )}
          </div>
        </div>
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

      <Dialog open={addLinkedInOpen} onClose={handleAddLinkedInClose}>
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
