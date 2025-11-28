"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const AddCartBtn = ({ product }) => {
  return (
    <button
      className=" w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200"
    >
      Add to Cart
    </button>
  );
};

export default AddCartBtn;
