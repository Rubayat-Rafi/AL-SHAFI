"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const AddCartBtn = ({ product, styles }) => {
  const parseProduct = JSON.parse(product);
  const cartHandler = async () => {
    try {
      toast.success("Cart added");
    } catch (error) {
      throw new Error(error?.messsage);
    } finally {
    }
  };
  return (
    <button onClick={cartHandler} className={styles}>
      Add to Cart
    </button>
  );
};

export default AddCartBtn;
