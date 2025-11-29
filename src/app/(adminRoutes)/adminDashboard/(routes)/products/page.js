export const dynamic = "force-dynamic";
import product from "@/models/Products/Product/Product";
import React from "react";
import dbConnect from "@/lib/dbConnect/dbConnect";
import ProductTable from "@/components/AdminDashboard/Products/Product/ProductTable/ProductTable";
import ProductAddBtn from "@/components/Ui/Products/Product/ProductAddBtn/ProductAddBtn";
const Products = async () => {
  await dbConnect();
  const products = await product.find().sort({ createdAt: -1 }).lean();
  const formattedProducts = products.map((product) => ({
    ...product,
    _id: product._id.toString(),
  }));

  return (
    <div className="p-6 relative">
      <div className=" flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Product</h1>
        <ProductAddBtn />
      </div>
      {formattedProducts?.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
          <ProductTable product={JSON.stringify(formattedProducts)} />
        </div>
      )}
    </div>
  );
};

export default Products;
