"use client";
import useCategories from "@/hooks/products/categories/useCategories";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Sidebar = () => {
  const { sidebarFlag } = useSelector((state) => state?.slice);
  const { categories } = useCategories();
  const [scrollValue, setScrollValue] = useState(0);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => {
      const currentScroll = window.scrollY;
      setScrollValue(currentScroll);
      if (currentScroll > 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [scrollValue]);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`  lg:hidden fixed  z-50 h-full   bg-white
        transition-transform duration-300 ease-in-out
        ${
          !visible
            ? "top-30.5 max-md:top-35.5 max-sm:top-34  "
            : "top-17 max-sm:top-15 "
        }
        ${
          !sidebarFlag
            ? " -translate-x-full"
            : " translate-x-0"
        }
      `}
    >
      <div className="p-4 w-64">
        <div className=" flex flex-col gap-5">
            
          {categories?.map((categ) => (
            <Link
              key={categ._id}
              href={`/product/collections/${categ.slug}`}
              className="block  bg-green-600 p-2 transition transform hover:scale-105 duration-200"
            >
              <p className="text-gray-700 font-medium">{categ?.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
