export const dynamic = "force-dynamic";
import SideBar from "@/components/AdminDashboard/SideBar/SideBar";
import TopBar from "@/components/AdminDashboard/TopBar/TopBar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <TopBar />
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
