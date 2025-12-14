"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  ShoppingCart,
  UserRound,
  Search,
  Menu,
  X,
  FolderClock,
} from "lucide-react";
import Container from "../Container/Container";
import QueryProducts from "../Products/QueryProducts/QueryProducts";
import useAuthUser from "@/hooks/user/useAuthUser";
import { useCart } from "@/hooks/carts/useCart";
import { addCartFlag, addQuery } from "@/utils/redux/slices/slice";
import useCategories from "@/hooks/products/categories/useCategories";
// import Categories from "@/components/Categories/Categories";

const Navbar = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { cartFlag } = useSelector((state) => state.slice);
  const { carts } = useCart();
  const { user } = useAuthUser();
  const { categories } = useCategories();
  const [showSearch, setShowSearch] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

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
        } sticky top-0 z-20 bg-background shadow-md`}
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
          <div className="grid grid-cols-3 items-center py-3">
            <div className="flex items-center">
              <button
                onClick={() => setOpenMenu(!openMenu)}
                className="text-text lg:hidden"
              >
                {openMenu ? <X strokeWidth={2} /> : <Menu strokeWidth={2} />}
              </button>

              <button
                onClick={() => setShowSearch((prev) => !prev)}
                className="text-text rounded-full max-lg:hidden hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <Search strokeWidth={2} />
              </button>
            </div>
            <div className="flex justify-center">
              <Link href="/">
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={130}
                  height={50}
                  priority
                />
              </Link>
            </div>

            <div className="flex items-center justify-end gap-3">
              {/* <Link
                href="/admin-dashboard"
                className="text-text bg-primary/10 px-3 py-2 rounded-full max-lg:hidden"
              >
                Dashboard
              </Link> */}

              <Link
                href="/order/histories"
                className="text-text rounded-full max-lg:hidden hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <FolderClock strokeWidth={2} />
              </Link>

              <Link
                href={user ? "/account/profile" : "/login"}
                className="text-text rounded-full max-lg:hidden hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                {user ? (
                  <UserRound strokeWidth={2} />
                ) : (
                  <UserRound strokeWidth={2} />
                )}
              </Link>

              <button
                onClick={() => setShowSearch((prev) => !prev)}
                className="text-text rounded-full lg:hidden hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <Search strokeWidth={2} />
              </button>

              <button
                onClick={() => dispatch(addCartFlag(!cartFlag))}
                className="relative text-text hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <ShoppingCart strokeWidth={2} />
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {carts?.length || 0}
                </span>
              </button>
            </div>
          </div>
        </Container>

        <div className="py-3 px-8 md:px-8 hidden lg:block">
          <Container>
            <div className="flex flex-wrap space-x-6 items-center">
              <Link href={"/product/collections/all-products"}>
                {" "}
                All Products
              </Link>
              {categories?.map((categ) => (
                <Link
                  key={categ._id}
                  href={`/product/collections/${categ.slug}`}
                  className="block text-center transition transform hover:scale-105 duration-200 font-normal"
                >
                  <p className="text-gray-700 font-normal font-montserrat">
                    {categ?.name}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </div>

        {/* Mobile Sidebar (Overlay + Slide-in Drawer) */}
        {/* Overlay */}
        <div
          className={`fixed inset-0 bg-black/40 z-40 top-30 lg:hidden transition-opacity duration-300 ${
            openMenu ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          onClick={() => setOpenMenu(false)}
        ></div>
        {/* Sidebar Drawer */}
        <div
          className={`fixed top-30 left-0 h-screen w-64 bg-background shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
            openMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col space-y-6 items-start p-8">
            {categories?.map((categ) => (
              <Link
                key={categ._id}
                href={`/product/collections/${categ.slug}`}
                className="block  text-center transition transform hover:scale-105 duration-200"
              >
                <p className="text-gray-700 font-normal font-montserrat">
                  {categ?.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
