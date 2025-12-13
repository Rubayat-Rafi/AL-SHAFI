"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const QueryProducts = () => {
  const { query } = useSelector((state) => state?.slice);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const handler = async () => {
      try {
        const {data} = await axios.get("/pages/api/products/query_products",{
            vai
        })
      } catch (error) {
        throw new Error(error?.message);
      }
    };
    handler();
  }, [query]);
  console.log(query);
  return <div>QueryProducts</div>;
};

export default QueryProducts;
