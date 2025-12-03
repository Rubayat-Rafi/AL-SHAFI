export const dynamic = "force-dynamic";
import SideBar from "@/components/AdminDashboard/SideBar/SideBar";
import React from "react";
import Navbar from "@/components/AdminDashboard/Navbar/Navbar";

const layout = ({ children }) => {
  return (
    <div>
      <Navbar/>
      <div className=" flex">
        <div>
          <SideBar />
        </div>
        <div className=" w-full">{children}</div>
      </div>
    </div>
  );
};

export default layout;
