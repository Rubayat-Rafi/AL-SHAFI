"use client";

import AddCartBtn from "@/components/Ui/Products/AddCartBtn/AddCartBtn";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const parseProduct = typeof product === "string" ? JSON.parse(product) : product;

  return (
    <div className="flex flex-col justify-between items-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
      {/* Product Image */}
      <div className="w-full h-64 relative mb-4">
        <Image
          src={parseProduct?.thumbnail?.secure_url || "/placeholder.png"}
          alt={parseProduct?.productName || "Product"}
          fill
          className="object-contain rounded-md"
          priority
        />
      </div>

      {/* Product Info */}
      <div className="w-full text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {parseProduct?.productName || "Unnamed Product"}
        </h3>
        <p className="text-green-600 font-bold text-md mt-1">
          TK {parseProduct?.offerPrice || 0}
        </p>
        {parseProduct?.regularPrice && parseProduct?.regularPrice > parseProduct?.offerPrice && (
          <p className="text-gray-500 line-through text-sm">
            TK {parseProduct?.regularPrice}
          </p>
        )}
      </div>

      {/* Add to Cart Button */}
      <div className="w-full">
        <AddCartBtn product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
