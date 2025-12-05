"use client";

import Image from "next/image";
import {
  MagnifyingGlassIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { useCart } from "@/hooks/carts/useCart";
import Container from "../Container/Container";
import { useDispatch, useSelector } from "react-redux";
import { addCartFlag } from "@/utils/redux/slices/slice";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, UserRound, Search } from "lucide-react";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  const { carts } = useCart();
  const dispatch = useDispatch();
  const { cartFlag } = useSelector((state) => state?.slice);
  const validPath = pathname.startsWith("/admin-dashboard");

  return (
    <nav
      className={`${
        validPath && "hidden"
      } w-full shadow-md px-4 md:px-8 py-3 bg-background z-50 sticky top-0`}
    >
      {/* 🔳 Black Overlay (click to close) */}
      {showSearch && (
        <div
          onClick={() => setShowSearch(false)}
          className="fixed inset-0 bg-black/30 bg-opacity-50 z-40"
        ></div>
      )}

      {/* 🔍 Slide-down Search Box */}
      <div
        className={`absolute left-0 w-full bg-background px-6 py-12 shadow-md transition-all duration-300 ease-in-out z-50
    ${showSearch ? "-top-14 opacity-100" : "-top-24 opacity-0"}`}
      >
        <div className="flex items-center justify-center mx-auto border border-gray-300 rounded-lg px-4 py-2 max-w-xl">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

      <Container>
        <div className="grid grid-cols-3 items-center">
          {/* LEFT — Search Icon */}
          <div className="flex items-center">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-primary  bg-primary/10 p-2 rounded-full"
            >
              <Search strokeWidth={2} className="h-5 w-5" />
            </button>
          </div>

          {/* CENTER — Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={150}
                height={50}
                priority
                className="object-contain"
              />
            </Link>
          </div>

          {/* RIGHT — Account + Cart */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/login"
              className="flex items-center gap-1 text-primary bg-primary/10 p-2 rounded-full "
            >
              <UserRound strokeWidth={2} className="h-5 w-5" />
              {/* <span className="hidden md:inline">Account</span> */}
            </Link>

            <button
              onClick={() => dispatch(addCartFlag(!cartFlag))}
              className="relative flex items-center text-primary bg-primary/10 p-2 rounded-full "
            >
              <ShoppingCart strokeWidth={2} className="h-5 w-5" />
              <span className="absolute -right-1.5 -top-1.5 bg-red-500 text-white w-4 h-4 text-[10px] rounded-full flex items-center justify-center">
                {carts?.length < 1 ? 0 : carts?.length}
              </span>
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
