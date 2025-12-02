"use client";
import React, { useState, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addActiveFlag } from "@/utils/redux/slices/slice";

const QtyBtn = ({ slug, initialQty = 1, maxQty, productPrice }) => {
  const dispatch = useDispatch();
  const { activeFlag } = useSelector((state) => state?.slice);
  const [quantity, setQuantity] = useState(initialQty);
  useEffect(() => {
    const handler = () => {
      const storedData = JSON.parse(localStorage.getItem("carts")) || [];
      const found = storedData.find((item) => item.slug === slug);
      if (found) {
        setQuantity(found.qty);
      }
    };
    handler();
  }, [slug]);
  const updateLocalStorage = (newQty) => {
    const storedData = JSON.parse(localStorage.getItem("carts")) || [];
    const updated = storedData.map((item) =>
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
    const clampedValue = Math.min(Math.max(value, 1), maxQty);
    updateLocalStorage(clampedValue);
    setQuantity(clampedValue);
  };

  return (
    <div className="">
      <p className="text-2xl sm:text-3xl font-bold text-red-600">
        ${(productPrice * quantity).toFixed(2)}
      </p>

      <div className="inline-flex items-center bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-sm hover:border-blue-400 transition-all duration-200">
        {/* Minus */}
        <button
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4 text-gray-700" />
        </button>

        {/* Input */}
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min="1"
          max={maxQty}
          className="w-14 text-center font-semibold text-gray-800 bg-white focus:outline-none focus:bg-blue-50 transition-colors"
          aria-label="Quantity"
        />

        {/* Plus */}
        <button
          onClick={handleIncrease}
          disabled={quantity >= maxQty}
          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4 text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default QtyBtn;
