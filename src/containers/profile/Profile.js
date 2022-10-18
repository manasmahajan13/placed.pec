import React from "react";
import './profile.css'

const Profile = () => {
  return <>
  <div className="profileWrapper">
    <div className="profileContentWrapper">
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
          <div className="profileContentItems name">Mohim Singla</div>
          <div className="profileContentItems passoutInfo">2023 Passout Batch · 19104102</div>
          <div className="profileContentItems degreeInfo">5th Semester, B.Tech</div>
          <div className="profileContentItems degreeInfo">Electrical Engineering, Department of Electrical Engineering</div>
          <div className="profileContentItems degreeInfo">PEC UNIVERSITY OF TECHNOLOGY</div>
          <div className="profileContentItems accountID">Unique Account ID: 999 999</div>
      </div>
    </div>
  </div>;
  </>
};

export default Profile;
