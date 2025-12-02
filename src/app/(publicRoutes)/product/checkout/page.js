"use client";
import React, { useState, useMemo } from "react";
import { Package, MapPin, Phone, Mail, User, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/carts/useCart";
import { useFetchCarts } from "@/hooks/carts/useFetchcarts";
import Image from "next/image";
import AreaSelections from "@/components/AreaSelections/AreaSelections";

const Checkout = () => {
  const { carts } = useCart();
  const { fetchCarts: products, loading } = useFetchCarts(carts);
  const [selectDta, setSelectDta] = useState(null);
  const quantityMap = useMemo(() => {
    const map = {};
    carts.forEach((item) => {
      map[item.slug] = item.qty;
    });
    return map;
  }, [carts]);

  const { subtotal, shippingTotal, grandTotal } = useMemo(() => {
    let subtotal = 0;
    let shippingTotal = 0;

    products?.forEach((p) => {
      const qty = quantityMap[p.slug] || 1;
      const price = p.offerPrice || p.regularPrice;

      subtotal += price * qty;
      if (p.shipping_fee !== "paid") {
        shippingTotal += Number(p.shipping_fee) || 0;
      }
    });

    return {
      subtotal,
      shippingTotal,
      grandTotal: subtotal + shippingTotal,
    };
  }, [products, quantityMap]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    district: "",
    city: "",
    note: "", // <-- new field
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const division = selectDta?.division
const district = selectDta?.district
const upazila = selectDta?.upazila

    const payload = {
      ...formData,
      products,
      totals: { subtotal, shippingTotal, grandTotal },
    };
    const payloadFroSteadFast = {
      flag: "steadFast",
    };
    console.log(payload);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">
            Complete your order in a few simple steps
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                    <User className="w-5 h-5 text-blue-600" />
                    <h2 className="text-xl font-semibold text-gray-800">
                      Contact Information
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email{" "}
                          <span className="text-gray-400">(optional)</span>
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="017xxxxxxxx"
                            className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="">
                        <h2 className=" text-sm">
                          Building / House No / Floor / Street
                        </h2>
                        <input
                          type="text"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          placeholder="District"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                          required
                        />
                      </div>
                      <div className="">
                        <h2 className="text-sm  ">
                          Colony / Suburb / Locality / Landmark
                        </h2>

                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City / Thana"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                          required
                        />
                      </div>
                    </div>
                    {/* areas sectons_start */}
                    <AreaSelections setSelectDta={setSelectDta} />
                    {/* ------------------------ */}
                    <div className="">
                      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-200">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-800">
                          Shipping Address
                        </h2>
                      </div>

                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="House no., Road no., Area..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                        rows={3}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Note <span className="text-gray-400">(optional)</span>
                      </label>
                      <textarea
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        placeholder="Delivery instructions or other notes"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-all"
                >
                  <Package className="w-5 h-5 inline-block mr-2" />
                  Place Order
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-600" />
                Order Summary
              </h2>

              <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                {loading && <p className="text-sm text-gray-500">Loading...</p>}

                {products?.map((p) => (
                  <div
                    key={p._id}
                    className="flex gap-3 bg-gray-50 p-3 rounded-xl border border-slate-300"
                  >
                    <Image
                      src={p.thumbnail?.secure_url}
                      alt={p.productName}
                      width={500}
                      height={500}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {p.productName}
                      </p>
                      <p className="text-xs text-gray-500 capitalize">
                        Category: {p.category}
                      </p>
                      <p className="text-sm font-medium mt-1">
                        Qty: {quantityMap[p.slug] || 1}
                      </p>

                      <p className="text-blue-600 font-semibold">
                        ৳ {p.offerPrice || p.regularPrice}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳ {subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping Fee</span>
                  <span>
                    {shippingTotal === 0 ? "Free" : `৳ ${shippingTotal}`}
                  </span>
                </div>

                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t">
                  <span>Total</span>
                  <span>৳ {grandTotal}</span>
                </div>
              </div>

              <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    Cash on Delivery
                  </p>
                  <p className="text-xs text-gray-600">
                    Pay when your order arrives at your doorstep.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
