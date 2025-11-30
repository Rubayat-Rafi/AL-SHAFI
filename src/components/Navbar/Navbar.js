"use client";

import Image from "next/image";
import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useCart } from "@/hooks/carts/useCart";

const Navbar = () => {
  const { carts } = useCart();

  return (
    <nav className="sticky top-0 w-full bg-white shadow-md px-4 md:px-8 py-3">
      <div className="flex items-center justify-between">
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
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/dusp1j4e0/image/upload/v1764309061/Al-Safi/logos/logo_2_gsvks8.png"
              alt="logo"
              width={150}
              height={50}
              priority
              className="object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="flex items-center gap-1 text-gray-700 hover:text-gray-900"
          >
            <UserIcon className="h-6 w-6" />
            <span className="hidden md:inline">Account</span>
          </Link>

          <Link href={"/product/carts"}>
            <button className="relative flex items-center gap-1 text-gray-700 hover:text-gray-900">
              <ShoppingCartIcon className="h-6 w-6" />
              {
                <span className="absolute -top-3 bg-red-600 text-white w-5 h-5 text-xs rounded-full">
                  {carts?.length < 1 ? 0 : carts?.length}
                </span>
              }
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
