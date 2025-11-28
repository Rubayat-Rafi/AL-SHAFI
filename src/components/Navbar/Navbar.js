"use client";
import Image from "next/image";
import { MagnifyingGlassIcon, UserIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md px-4 md:px-8 py-3">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center border rounded-lg px-2 py-1 w-1/3 md:w-1/4">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full outline-none text-sm"
          />
        </div>
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="https://res.cloudinary.com/dusp1j4e0/image/upload/v1764309061/Al-Safi/logos/logo_2_gsvks8.png"
            alt="logo"
            width={150}
            height={50}
            priority
            className="object-contain"
          />
        </div>
        {/* Account & Cart */}
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
            <UserIcon className="h-6 w-6" />
            <span className="hidden md:inline">Account</span>
          </button>
          <button className="flex items-center gap-1 text-gray-700 hover:text-gray-900">
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="hidden md:inline">Cart</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
