"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Layers,
  Settings,
  LogOut,
} from "lucide-react";
const menuItems = [
  {
    title: "Home",
    href: "/",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Dashboard",
    href: "/admin-dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Orders",
    href: "/admin-dashboard/orders",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Categories",
    href: "/admin-dashboard/categories",
    icon: <Layers size={20} />,
  },
  {
    title: "Products",
    href: "/admin-dashboard/products",
    icon: <Package size={20} />,
  },
  {
    title: "Settings",
    href: "/admin-dashboard/settings",
    icon: <Settings size={20} />,
  },
];

const SideBar = () => {
  const pathname = usePathname();
  return (
    <div className="w-64 h-screen border-r bg-white flex flex-col py-6 px-4">
      {/* Logo */}
      <div className="text-2xl font-bold tracking-tight text-blue-600 mb-8 px-2">
        Admin Panel
      </div>

      {/* Menu Items */}
      <nav className="flex-1">
        {menuItems.map((item, i) => {
          const active = pathname === item.href;

          return (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 mb-1 rounded-md transition-all 
              ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.icon}
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <button className="flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50">
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default SideBar;
