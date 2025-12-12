"use client";

import { addCommonFlag } from "@/utils/redux/slices/slice";
import { useDispatch, useSelector } from "react-redux";

const ViewPopup = () => {
  const dispatch = useDispatch();
  const { commonData, commonFlag } = useSelector((state) => state?.slice);

  if (commonFlag !== "view_order") return null;

  const order = commonData || {};

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white text-black p-6 rounded-xl w-[90%] md:w-[500px] max-h-[80vh] overflow-y-auto shadow-2xl">
        
        <h2 className="text-xl font-bold mb-4">Order Details</h2>

        {/* BASIC INFO */}
        <div className="space-y-2 mb-4">
          <p><strong>Name:</strong> {order.fullName}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Invoice:</strong> {order.invoice}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>

        {/* ADDRESSES */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Addresses:</h3>
          {order.addresses?.map((addr, i) => (
            <div key={i} className="border p-2 rounded mb-2 bg-gray-100">
              {Object.entries(addr).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* TOTALS */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Totals:</h3>
          <p>Subtotal: {order?.totals?.subtotal} ৳</p>
          <p>Shipping: {order?.totals?.shippingTotal} ৳</p>
          <p className="font-bold">Grand Total: {order?.totals?.grandTotal} ৳</p>
        </div>

        {/* NOTE */}
        {order.note && (
          <p className="mb-4">
            <strong>Note:</strong> {order.note}
          </p>
        )}

        <button
          onClick={() => dispatch(addCommonFlag(null))}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewPopup;
