"use client";
import { useCart } from "@/hooks/carts/useCart";
import { addActiveFlag, addCartFlag } from "@/utils/redux/slices/slice";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
const AddCartBtn = ({ product, styles }) => {
  const dispatch = useDispatch();
  const { activeFlag, cartFlag } = useSelector((state) => state?.slice);
  const parseProduct = JSON.parse(product);
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => {
        addToCart(parseProduct), dispatch(addActiveFlag(!activeFlag));
        dispatch(addCartFlag(!cartFlag));
      }}
      className={styles}
    >
      <ShoppingCart
        className="w-4 h-4 group-hover/btn:scale-110 transition-transform"
        strokeWidth={2}
      />
      Add to Cart
    </button>
  );
};

export default AddCartBtn;
