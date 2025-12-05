"use client";
import React, { useState, useMemo } from "react";
import { Package, MapPin, Phone, Mail, User, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/carts/useCart";
import { useFetchCarts } from "@/hooks/carts/useFetchcarts";
import Image from "next/image";
import AreaSelections from "@/components/AreaSelections/AreaSelections";
import Container from "@/components/Container/Container";
import axios from "axios";
import { toast } from "react-toastify";

const Checkout = () => {
  const { carts } = useCart();
  const { fetchCarts: products, loading } = useFetchCarts(carts);

  const [selectDta, setSelectDta] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const quantityMap = useMemo(() => {
    const map = {};
    carts.forEach((item) => {
      map[item.slug] = item.qty;
    });
    return map;
  }, [carts]);

  const { subtotal, shippingTotal, grandTotal, quantities } = useMemo(() => {
    let subtotal = 0;
    let shippingTotal = 0;
    let quantities = 0;

    products?.forEach((p) => {
      const qty = quantityMap[p.slug] || 1;
      const price = p.offerPrice || p.regularPrice;

      quantities = qty;
      subtotal += price * qty;
      if (p.shipping_fee !== "paid") {
        shippingTotal += Number(p.shipping_fee) || 0;
      }
    });

    return {
      subtotal,
      shippingTotal,
      quantities,
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

  const handleChange = async (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const division = selectDta?.division;
    const district = selectDta?.district;
    const upazila = selectDta?.upazila;
    const fixedAddress = {
      divisionName: division?.name,
      districtName: district?.name,
      upazilaName: upazila?.name,
    };
    const payload = {
      ...formData,
      flag: "steadFast",
      products: carts,
      fixedAddress,
      totals: { subtotal, shippingTotal, grandTotal },
    };
    const { data } = await axios.post("/pages/api/orders/order", payload);
    if (data?.success) {
      toast.success("Order created")
    }else{
       toast.warning("Order not created")
    }
  };

  return (
    <Container>
      <div className=" py-10">
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

              {/* ---------------- PAYMENT METHOD SECTION ---------------- */}
              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Payment Method
                </label>

                <div className="relative">
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="cod">Cash on Delivery</option>
                    <option value="bkash">bKash</option>
                    <option value="nagad">Nagad</option>
                    <option value="rocket">Rocket</option>
                    <option value="card">Credit / Debit Card</option>
                  </select>
                </div>

                {/* -------- Payment Details (Conditional Rendering) -------- */}

                {paymentMethod === "cod" && (
                  <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
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
                )}

                {paymentMethod === "bkash" && (
                  <div className="mt-4 bg-pink-50 border border-pink-200 rounded-xl p-4 text-sm">
                    <p className="font-semibold text-gray-900">bKash Payment</p>
                    <p className="text-xs text-gray-600">
                      You will receive a bKash number after placing the order.
                    </p>
                  </div>
                )}

                {paymentMethod === "nagad" && (
                  <div className="mt-4 bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm">
                    <p className="font-semibold text-gray-900">Nagad Payment</p>
                    <p className="text-xs text-gray-600">
                      Pay via Nagad after placing your order.
                    </p>
                  </div>
                )}

                {paymentMethod === "rocket" && (
                  <div className="mt-4 bg-purple-50 border border-purple-200 rounded-xl p-4 text-sm">
                    <p className="font-semibold text-gray-900">
                      Rocket Payment
                    </p>
                    <p className="text-xs text-gray-600">
                      Payment instructions will be sent to your phone.
                    </p>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm">
                    <p className="font-semibold text-gray-900">Card Payment</p>
                    <p className="text-xs text-gray-600">
                      We accept Visa, MasterCard, and American Express.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
