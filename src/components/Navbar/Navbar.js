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

const Navbar = () => {
  const { carts } = useCart();

  return (
    <nav className="sticky top-0 w-full shadow-md px-4 md:px-8 py-3 bg-background">
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-6">
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

            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-2">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full outline-none text-sm  "
              />
            </div>
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
      </Container>
    </nav>
  );
};

export default Navbar;
