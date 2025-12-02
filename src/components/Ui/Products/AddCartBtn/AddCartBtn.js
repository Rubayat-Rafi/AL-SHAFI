"use client";
import { useCart } from "@/hooks/carts/useCart";
import { addActiveFlag } from "@/utils/redux/slices/slice";
import { useDispatch, useSelector } from "react-redux";
const AddCartBtn = ({ product, styles }) => {
  const dispatch = useDispatch()
  const {activeFlag} = useSelector((state)=>state?.slice)
  const parseProduct = JSON.parse(product);
  const { addToCart } = useCart();
  return (
    <button onClick={() => {addToCart(parseProduct.slug),dispatch(addActiveFlag(!activeFlag))}} className={styles}>
      Add to Cart
    </button>
  );
};

export default AddCartBtn;
