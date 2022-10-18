import React from "react";
import "./profile.css";
const Profile = () => {
  return (
    <div className="profilePage">
      <div className="profileWrapper">
        <div className="sideMenuBar">
          <div className="sideMenuBarItems">Profile</div>
          <div className="sideMenuBarItems">About</div>
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
        </div>
        <div className="profileContent">
          <div>
            <img
              src={require("../../assets/images/placeholder-profile.png")}
              alt="Profile"
              className="profileImg"
            />
          </div>
          <h2>Mohim Singla</h2>
          <h3>2023 Passout Batch · 19104102</h3>
          <div>5th Semester, B.Tech</div>
          <div>
            Electrical Engineering, Department of Electrical Engineering
          </div>
          <div>PEC UNIVERSITY OF TECHNOLOGY</div>
          <div>Unique Account ID: 000001</div>
          <hr />
          <h3>About</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
