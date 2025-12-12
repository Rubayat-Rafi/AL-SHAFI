"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addCartFlag } from "@/utils/redux/slices/slice";
import { useCart } from "@/hooks/carts/useCart";
import QtyBtn from "@/components/Ui/Products/QtyBtn/QtyBtn";
import Link from "next/link";
const CartSidebar = () => {
  const dispatch = useDispatch();
  const { cartFlag } = useSelector((state) => state.slice);
  const { carts } = useCart();

  const isOpen = cartFlag;

  const closeCart = () => dispatch(addCartFlag(false));

  // Subtotal
  const subtotal = carts.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
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
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-5">

            {/* Empty Cart */}
            { carts.length === 0 && (
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

            {/* Cart List */}
            {carts.length > 0 &&
              carts.map((cart, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 hover:shadow-md"
                >
                  {/* Image */}
                  <div className="shrink-0">
                    <Image
                      src={cart.img}
                      alt={cart.productName}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {cart.productName}
                    </h3>

                    <p className="text-sm text-gray-500 capitalize mt-1">
                      {cart.category}
                    </p>

                    {/* Qty Button */}
                    <QtyBtn prod={JSON.stringify(cart)} />
                  </div>
                </div>
              ))}
          </div>

          {/* Footer */}
          {carts.length > 0 && (
            <div className="border-t p-6 bg-gray-50">
              <div className="flex justify-between text-xl font-bold mb-4">
                <span>Subtotal</span>
                <span>৳ {subtotal.toLocaleString()}</span>
              </div>

              <Link
                href={"/product/checkout"}
                onClick={closeCart}
                className="block w-full bg-blue-600 text-white text-center py-4 rounded-lg font-semibold hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>

              <Link
                onClick={closeCart}
                href={"/product/carts"}
              >
                <p className="text-gray-500 text-center mt-3">View All</p>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
