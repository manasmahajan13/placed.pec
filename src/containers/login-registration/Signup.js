import React from "react";
import { Link, Outlet } from "react-router-dom";

function Signup(props) {
  return (
    <div>
      Already have an account? <Link to="/login">Log In</Link> instead
    </div>
  );
}

export default Signup;
