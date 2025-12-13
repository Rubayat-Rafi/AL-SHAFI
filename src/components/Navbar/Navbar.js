"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ShoppingCart, UserRound, Search } from "lucide-react";
import Container from "../Container/Container";
import QueryProducts from "../Products/QueryProducts/QueryProducts";
import useAuthUser from "@/hooks/user/useAuthUser";
import { useCart } from "@/hooks/carts/useCart";
import { addCartFlag, addQuery } from "@/utils/redux/slices/slice";
// import Categories from "@/components/Categories/Categories";



const Navbar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { cartFlag } = useSelector((state) => state.slice);
  const { carts } = useCart();
  const { user } = useAuthUser();

  const [showSearch, setShowSearch] = useState(false);

  const validPath = pathname.startsWith("/admin-dashboard");

  return (
    <>
      {showSearch && (
        <div
          onClick={() => setShowSearch(false)}
          className="fixed inset-0 bg-black/30 z-40"
        />
      )}

      <nav
        className={`${
          validPath && "hidden"
        } sticky top-0 z-50 bg-background shadow-md`}
      >
        <div
          className={`absolute left-0 top-full w-full bg-background shadow-md transition-all duration-300 ease-in-out
          ${
            showSearch
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="px-6 py-6">
            <div className="flex items-center mx-auto border border-gray-300 rounded-lg px-4 py-2 max-w-xl">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                onChange={(e) => dispatch(addQuery(e.target.value))}
                className="w-full outline-none text-sm "
              />
            </div>

            {/* Results */}
            <div className="relative mt-4 max-w-xl mx-auto">
              <QueryProducts />
            </div>
          </div>
        </div>

        <Container>
          <div className="grid grid-cols-3 items-center py-3 px-4 md:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setShowSearch((prev) => !prev)}
                className="text-primary bg-primary/10 p-2 rounded-full"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={150}
                  height={50}
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Link
                href="/admin-dashboard"
                className="text-primary bg-primary/10 px-3 py-2 rounded-full"
              >
                Dashboard
              </Link>

              <Link
                href="/order/histories"
                className="text-primary bg-primary/10 px-3 py-2 rounded-full"
              >
                Histories
              </Link>

              <Link
                href={user ? "/account/profile" : "/login"}
                className="text-primary bg-primary/10 p-2 rounded-full"
              >
                {user ? (
                  <UserRound className="h-5 w-5" />
                ) : (
                  <span className="hidden md:inline">Account</span>
                )}
              </Link>

              <button
                onClick={() => dispatch(addCartFlag(!cartFlag))}
                className="relative text-primary bg-primary/10 p-2 rounded-full"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {carts?.length || 0}
                </span>
              </button>
            </div>
          </div>

          <div>
            {/* <Categories/> */}
          </div>
        </Container>
      </nav>


    </>
  );
};

export default Navbar;
