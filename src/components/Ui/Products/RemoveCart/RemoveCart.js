"use client";
import { addActiveFlag } from "@/utils/redux/slices/slice";
import { useDispatch, useSelector } from "react-redux";
const RemoveCart = ({ prod }) => {
  const dispatch = useDispatch();
  const { activeFlag } = useSelector((state) => state?.slice);
  const product = JSON.parse(prod);
  const handleRemove = () => {
    const stored = localStorage.getItem("carts");
    const storedCarts = JSON.parse(stored);
    const updated = storedCarts.filter((item) => item !== product.slug);
    localStorage.setItem("carts", JSON.stringify(updated));
    dispatch(addActiveFlag(!activeFlag));
  };
  return (
    <button
      onClick={() => handleRemove()}
      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
    >
      X
    </button>
  );
};

export default RemoveCart;
