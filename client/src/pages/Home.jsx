import React from "react";
import SideNav from "../components/SideNav";
import { Outlet } from "react-router-dom";
import RegisterStudet from "../components/RegisterStudet";

function Home() {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <SideNav />
      <Outlet />
    </div>
  );
}

export default Home;
