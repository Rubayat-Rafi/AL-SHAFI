// export const dynamic = "force-dynamic";
'use client'
import SideBar from "@/components/AdminDashboard/SideBar/SideBar";
import React, { useState } from "react";
import Navbar from "@/components/AdminDashboard/Navbar/Navbar";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 w-full">
          {/* Navbar */}
          <Navbar setSidebarOpen={setSidebarOpen} />

          {/* Page Content */}
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
