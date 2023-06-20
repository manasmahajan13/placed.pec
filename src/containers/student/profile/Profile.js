import React, { useEffect, useState } from "react";
import { getProfile } from "../../../api/profileApi";
import { useSelector, useDispatch } from "react-redux";
import "./profile.css";
import { setUserData } from "../../../redux/slice/user.slice";
import ResumeSection from "./ResumeSection";
import SummarySection from "./SummarySection";
import { Avatar, Button, Skeleton, Switch } from "@mui/material";
import { openInNewTab } from "../../../helpers/UtilityFunctions";
import SocialMediaAccountSection from "./SocialMediaAccountSection";

export const branchMappings = {
  102: "Civil Engineering",
  103: "Computer Science Engineering",
  104: "Electrical Engineering",
  105: "Electronics and Communication Engineering",
  107: "Mechanical Engineering",
};

export const sidToBranch = (sid) => {
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

export const sidToPassoutBatch = (sid) => {
  const passingYear = +("20" + sid?.substring(0, 2)) + 4;
  return `${passingYear} Passout Batch`;
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const profileData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const refreshPage = async () => {
    setIsLoading(true);
    const data = await getProfile();
    dispatch(setUserData(data));
    setIsLoading(false);
  };

  useEffect(() => {
    refreshPage();
  }, []);

  return (
    <div className="profilePage">
      <div className="profileContent">
        <div className="profileSection shadowed">
          <div className="profileHeaderSection">
            <div className="profileAvatarSection">
              <Avatar className="profileAvatar" />
            </div>
            <div className="title">
              {isLoading ? (
                <div style={{ display: "flex", gap: "16px" }}>
                  <Skeleton width={120} />
                  <Skeleton width={80} />
                </div>
              ) : (
                profileData.fullName
              )}
            </div>
            <div
              className="heading1"
              style={{ marginBottom: "16px", display: "flex" }}
            >
              {isLoading ? (
                <Skeleton width={120} />
              ) : (
                sidToPassoutBatch(profileData.SID)
              )}{" "}
              · {isLoading ? <Skeleton width={80} /> : profileData.SID}
            </div>
            <div className="heading3">
              {isLoading ? (
                <Skeleton width={120} />
              ) : (
                <div>CGPA: {profileData.cgpa}</div>
              )}
            </div>
            <div className="heading3">
              {isLoading ? (
                <Skeleton width={120} />
              ) : (
                sidToBranch(profileData.SID)
              )}
            </div>
            <div className="heading3">PEC (Deemed to be University)</div>
            
          </div>
          <SummarySection refreshPage={refreshPage} />
        </div>
        <div className="profileSection shadowed">
          <ResumeSection refreshPage={refreshPage} />
        </div>
        <div className="profileSection shadowed">
          <SocialMediaAccountSection refreshPage={refreshPage}></SocialMediaAccountSection>
        </div>
      </div>
    </div>
  );
};

export default Profile;
