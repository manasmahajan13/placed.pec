import { Button } from "@mui/material";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import "./AdminPanel.css";

export default function AdminPanel() {
  const navigate = useNavigate();
  return (
    <div className="adminWrapper">
      <Outlet />
    </div>
  );
}
