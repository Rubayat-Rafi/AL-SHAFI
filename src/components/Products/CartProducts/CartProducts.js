"use client";
import RemoveCart from "@/components/Ui/Products/RemoveCart/RemoveCart";
import { useCart } from "@/hooks/carts/useCart";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
const CartProducts = () => {
  const { carts } = useCart();
  const [products, setProducts] = useState([]);
  const totalPrice = products.reduce((sum, p) => sum + p.offerPrice, 0);
  useEffect(() => {
    const handler = async () => {
      try {
        const { data } = await axios.get(
          `/pages/api/products/by_slugs?slugs=${encodeURIComponent(
            carts.join(",")
          )}`
        );
        if (data?.success) {
          setProducts(data?.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        throw new Error(error?.message);
      }
    };
    handler();
  }, [carts]);
  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 hover:bg-gray-50 transition-colors"
                >
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                      <Image
                        src={product.thumbnail.secure_url}
                        alt={product.productName}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {product.productName}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Category:{" "}
                      <span className="font-medium">{product.category}</span>
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      Availability:{" "}
                      <span
                        className={`font-medium ${
                          product.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">
                      ${product.offerPrice.toFixed(2)}
                    </p>
                  </div>

                  {/* Action Button */}
                  <div className="w-full md:w-auto">
                    <RemoveCart prod={JSON.stringify(product)} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Card */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">
                    Subtotal ({products.length} items)
                  </span>
                  <span className="font-semibold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-500">Calculated at checkout</span>
                </div>
                <div className="border-t pt-6">
                  <div className="flex justify-between text-2xl font-bold text-gray-900">
                    <span>Total</span>
                    <span className="text-red-600">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-8 py-4 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors shadow-lg">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProducts;
