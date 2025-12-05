"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCartFlag } from "@/utils/redux/slices/slice";
import { useCart } from "@/hooks/carts/useCart";
import { useFetchCarts } from "@/hooks/carts/useFetchcarts";
import QtyBtn from "@/components/ui/products/QtyBtn/QtyBtn";
import Link from "next/link";
const CartSidebar = () => {
  const dispatch = useDispatch();
  const { cartFlag } = useSelector((state) => state.slice);
  const { carts } = useCart();
  const { fetchCarts: products, loading } = useFetchCarts(carts);
  const isOpen = cartFlag;
  const hasItems = products && products.length > 0;
  const closeCart = () => dispatch(addCartFlag(false));
  // Calculate subtotal
  const subtotal = products?.reduce((total, product) => {
    const cartItem = carts.find((item) => item.slug === product.slug);
    const qty = cartItem?.qty || 1;
    const price = product.offerPrice || product.regularPrice;
    return total + price * qty;
  }, 0);
  
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0  w-fit bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={closeCart}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              aria-label="Close cart"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">
            {loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 animate-pulse">
                  Loading your cart...
                </p>
              </div>
            )}

            {!loading && !hasItems && (
              <div className="text-center py-16">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto mb-4" />
                <p className="text-xl font-medium text-gray-700">
                  Your cart is empty
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Add some products to get started!
                </p>
              </div>
            )}

            {!loading &&
              hasItems &&
              products.map((product) => {
                const cartItem = carts.find(
                  (item) => item.slug === product.slug
                );
                const qty = cartItem?.qty || 1;
                const price = product.offerPrice || product.regularPrice;
                const shippingFee = product.shipping_fee;

                return (
                  <div
                    key={product._id}
                    className="flex gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    {/* Image */}
                    <div className="shrink-0">
                      <Image
                        src={
                          product.thumbnail?.secure_url || "/placeholder.jpg"
                        }
                        alt={product.productName}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">
                        {product.productName}
                      </h3>
                      <p className="text-sm text-gray-500 capitalize mt-1">
                        {product.category}
                      </p>
                      <QtyBtn prod={JSON.stringify(product)} />

                      <p className="text-xs text-gray-500 mt-2">
                        Shipping:{" "}
                        <span className="font-medium text-green-600">
                          {shippingFee === "paid" ? "Free" : `৳ ${shippingFee}`}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Footer - Subtotal & Checkout */}
          {hasItems && !loading && (
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Subtotal</span>
                <span className="text-text">
                  ৳ {subtotal?.toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => {
                  dispatch(addCartFlag(!cartFlag));
                }}
                className="w-full bg-blue-600 text-white  rounded-lg overflow-hidden font-semibold text-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Link
                  href={"/product/checkout"}
                  className="  py-4 w-full h-full block"
                >
                  Proceed to Checkout
                </Link>
              </button>
              <Link
                onClick={() => {
                  dispatch(addCartFlag(!cartFlag));
                }}
                href={"/product/carts"}
              >
                <p className=" text-gray-500 text-center mt-3">View All</p>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
