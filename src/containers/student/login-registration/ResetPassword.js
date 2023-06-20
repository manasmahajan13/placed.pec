import React from "react";
import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { resetPassword } from "../../../api/userApi";

function ResetPassword() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [successful, setSuccessful] = useState(false);

  const checkUserExists = async () => {
    try {
      await resetPassword(registerEmail);
      setSuccessful(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signupContainer">
      <div className="homeImg">
        <img src={require("../../../assets/images/pec-home.jpg")} />
      </div>
      <div className="signupDialogContainer">
        <div className="signupDialog">
          <h1>Reset Password</h1>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            value={registerEmail}
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
            sx={{ paddingBottom: "16px" }}
          />
          <Button onClick={() => checkUserExists()} variant="contained">
            Reset Password
          </Button>
          <div style={{ opacity: successful ? "1" : "0" }}>
            Password reset email sent successfully! Check your spam folder if
            not found
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
