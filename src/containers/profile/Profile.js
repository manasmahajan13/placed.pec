import React, { useEffect } from "react";
import { getProfile } from "../../api/profileApi";
import { useSelector, useDispatch } from "react-redux";
import "./profile.css";
import { setUserData } from "../../redux/slice/user.slice";
import ResumeSection from "./ResumeSection";
import SummarySection from "./SummarySection";

const Profile = () => {
  const profileData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const refreshPage = async () => {
    const data = await getProfile();
    dispatch(setUserData(data));
  };

  useEffect(() => {
    refreshPage();
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
          </div>
          <SummarySection refreshPage={refreshPage} />
        </div>
        <div className="profileSection">
          <ResumeSection refreshPage={refreshPage} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
