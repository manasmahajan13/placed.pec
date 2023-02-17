import React, { useEffect } from "react";
import { getProfile } from "../../api/profileApi";
import { useSelector, useDispatch } from "react-redux";
import "./profile.css";
import { setUserData } from "../../redux/slice/user.slice";
import ResumeSection from "./ResumeSection";
import SummarySection from "./SummarySection";
import { Avatar } from "@mui/material";

const Profile = () => {
  const profileData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const refreshPage = async () => {
    const data = await getProfile();
    dispatch(setUserData(data));
  };

  const sidToPassoutBatch = (sid) => {
    const passingYear = +("20" + sid.substring(0, 2)) + 4;
    return `${passingYear} Passout Batch`;
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
              Electrical Engineering
            </div>
            <div className="heading3">
              PEC (DEEMED TO BE UNIVERSITY)
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
