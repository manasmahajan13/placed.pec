import React, { useEffect } from "react";
import { getProfile } from "../../api/profileApi";
import { useSelector, useDispatch } from "react-redux";
import "./profile.css";
import { setUserData } from "../../redux/slice/user.slice";
import ResumeSection from "./ResumeSection";
import SummarySection from "./SummarySection";
import { Avatar, Switch } from "@mui/material";

export const branchMappings = {
  102: "Civil Engineering",
  103: "Computer Science Engineering",
  104: "Electrical Engineering",
  105: "Electronics and Communication Engineering",
  107: "Mechanical Engineering"
}

const Profile = () => {
  const profileData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const refreshPage = async () => {
    const data = await getProfile();
    dispatch(setUserData(data));
  };

  const sidToPassoutBatch = (sid) => {
    const passingYear = +("20" + sid?.substring(0, 2)) + 4;
    return `${passingYear} Passout Batch`;
  };

  const sidToBranch = (sid) => {
    switch (sid?.substring(2, 5)) {
      case "102":
        return branchMappings[102];
      case "103":
        return branchMappings[103];
      case "104":
        return branchMappings[104];
      case "105":
        return branchMappings[105];
      case "107":
        return branchMappings[107];
      default:
        return "ENGINEERING";
    }
  };

  useEffect(() => {
    refreshPage();
  }, []);

  return (
    <div className="profilePage">
      <div className="profileContent">
        <div className="profileSection">
          <div className="profileHeaderSection">
            <div className="profileAvatarSection">
              <Avatar className="profileAvatar"/>
            </div>
            <div className="title">
              {profileData.fullName} 
            </div>
            <div className="heading1" style={{marginBottom: "16px"}}>{sidToPassoutBatch(profileData.SID)} · {profileData.SID}</div>
            <div className="heading3">
              {sidToBranch(profileData.SID)}
            </div>
            <div className="heading3">
              PEC (Deemed to be University)
            </div>
          </div>
          {/* <SummarySection refreshPage={refreshPage} /> */}
        </div>
        <div className="profileSection">
          <ResumeSection refreshPage={refreshPage} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
