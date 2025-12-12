"use client";
import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addActiveFlag } from "@/utils/redux/slices/slice";
import RemoveCart from "@/components/Ui/Products/RemoveCart/RemoveCart";

const QtyBtn = ({ prod }) => {
  const product = JSON.parse(prod);
  const slug = product.slug;
  const maxQty = product.stock || 10;
  const productPrice = product.offerPrice || product.price;
  const dispatch = useDispatch();
  const { activeFlag } = useSelector((state) => state.slice);
  const [quantity, setQuantity] = useState(product.qty || 1);
  useEffect(() => {
    const handler = () => {
      const stored = JSON.parse(localStorage.getItem("carts")) || [];
      const found = stored.find((item) => item.slug === slug);
      if (found) setQuantity(found.qty);
    };
    handler();
  }, [slug]);

  const updateLocalStorage = (newQty) => {
    const stored = JSON.parse(localStorage.getItem("carts")) || [];
    const updated = stored.map((item) =>
      item.slug === slug ? { ...item, qty: newQty } : item
    );
    localStorage.setItem("carts", JSON.stringify(updated));
  };

  const handleIncrease = () => {
    if (quantity < maxQty) {
      const newQty = quantity + 1;
      updateLocalStorage(newQty);
      setQuantity(newQty);
      dispatch(addActiveFlag(!activeFlag));
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQty = quantity - 1;
      updateLocalStorage(newQty);
      setQuantity(newQty);
      dispatch(addActiveFlag(!activeFlag));
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    const clamped = Math.min(Math.max(value, 1), maxQty);
    updateLocalStorage(clamped);
    setQuantity(clamped);
    dispatch(addActiveFlag(!activeFlag));
  };

  return (
    <div className="flex items-center justify-between gap-5">
      {/* Price */}
      <p className="font-bold">৳ {(productPrice * quantity).toFixed(2)}</p>

      {/* Qty Controls */}
      <div className="inline-flex items-center bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
        <button
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-40"
        >
          <Minus className="w-4 h-4 text-gray-700" />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min="1"
          max={maxQty}
          className="w-14 text-center font-semibold bg-white"
        />

        <button
          onClick={handleIncrease}
          disabled={quantity >= maxQty}
          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 disabled:opacity-40"
        >
          <Plus className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <RemoveCart prod={prod} />
    </div>
  );
};

export default QtyBtn;
