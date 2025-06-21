import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="p-4 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
