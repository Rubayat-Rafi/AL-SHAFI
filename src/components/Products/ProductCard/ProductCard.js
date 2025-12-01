"use client";
import AddCartBtn from "@/components/Ui/Products/AddCartBtn/AddCartBtn";
import { addActiveFlag } from "@/utils/redux/slices/slice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { activeFlag } = useSelector((state) => state);
  const parseProduct =
    typeof product === "string" ? JSON.parse(product) : product;
  const viewHistoryHandler = () => {
    const histoieIds = localStorage.getItem("p_slug");
    let parseHistoyIds = [];
    try {
      parseHistoyIds = histoieIds ? JSON.parse(histoieIds) : [];
    } catch (err) {
      console.error("Failed to parse history IDs", err);
      parseHistoyIds = [];
    }
    if (!parseHistoyIds.includes(parseProduct?.slug)) {
      const newHistoyIds = [parseProduct?.slug, ...parseHistoyIds];
      localStorage.setItem("p_slug", JSON.stringify(newHistoyIds));
    }
    dispatch(addActiveFlag(!activeFlag));
  };
  return (
    <div className="flex flex-col justify-between items-center p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
      {/* Product Image */}
      <div className="w-full h-40 relative mb-4">
        <Link
          onClick={viewHistoryHandler}
          href={`/product/product-details/${parseProduct?.slug}`}
        >
          <Image
            src={parseProduct?.thumbnail?.secure_url || "/placeholder.png"}
            alt={parseProduct?.productName || "Product"}
            fill
            className="object-contain rounded-md"
            priority
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="w-full text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {parseProduct?.productName || "Unnamed Product"}
        </h3>
        <p className="text-green-600 font-bold text-md mt-1">
          TK {parseProduct?.offerPrice || 0}
        </p>
        {parseProduct?.regularPrice &&
          parseProduct?.regularPrice > parseProduct?.offerPrice && (
            <p className="text-gray-500 line-through text-sm">
              TK {parseProduct?.regularPrice}
            </p>
          )}
      </div>

      {/* Add to Cart Button */}
      <div className="w-full">
        <AddCartBtn
          product={product}
          styles={
            " w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200"
          }
        />
      </div>
    </div>
  );
};

export default ProductCard;
