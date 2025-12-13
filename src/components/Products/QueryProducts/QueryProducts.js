"use client";

import AddCartBtn from "@/components/Ui/Products/AddCartBtn/AddCartBtn";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const QueryProducts = () => {
  const { query } = useSelector((state) => state.slice);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!query || query.trim() === "") {
      setProducts([]);
      return;
    }
    const handler = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/pages/api/products/query_products", {
          params: { query },
        });

        if (data?.success) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    handler();
  }, [query]);

  if (!query) return null;

  return (
    <div className="bg-white rounded-xl shadow-2xl border border-gray-100 mt-3 max-h-[450px] overflow-hidden">
      <div className="overflow-y-auto max-h-[450px] custom-scrollbar">
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-3"></div>
            <p className="text-sm text-gray-600 font-medium">
              Searching products...
            </p>
          </div>
        )}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4">
            <svg
              className="w-16 h-16 text-gray-300 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-gray-500 font-medium">No products found</p>
            <p className="text-xs text-gray-400 mt-1">
              Try adjusting your search query
            </p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div className="divide-y divide-gray-100">
            {products.map((product) => (
              <div
                key={product._id}
                className="flex items-stretch hover:bg-gray-50 transition-colors duration-200"
              >
                <Link
                  href={`/product/product-details/${product.slug}`}
                  className="flex items-center gap-4 px-5 py-4 flex-1 group"
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src={product.thumbnail?.secure_url || "/placeholder.png"}
                      alt={product.productName}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover ring-1 ring-gray-200 group-hover:ring-primary transition-all duration-200"
                    />
                    {product.regularPrice > product.offerPrice && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {Math.round(
                          ((product.regularPrice - product.offerPrice) /
                            product.regularPrice) *
                            100
                        )}
                        %
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200 line-clamp-1 mb-1">
                      {product.productName}
                    </h3>
                    <p className="text-xs text-gray-500 font-medium mb-2">
                      {product.category}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-bold text-primary">
                        ৳{product.offerPrice.toLocaleString()}
                      </span>
                      {product.regularPrice > product.offerPrice && (
                        <span className="text-xs line-through text-gray-400">
                          ৳{product.regularPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                <div className="flex items-center px-4 border-l border-gray-100">
                  <AddCartBtn
                    product={JSON.stringify(product)}
                    styles="px-4 py-2.5 text-nowrap bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 group/btn hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
};

export default QueryProducts;