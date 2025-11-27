export const dynamic = "force-dynamic";

import category from "@/models/products/category/category";
import dbConnect from "@/lib/dbConnect/dbConnect";
import Image from "next/image";
import CatEditNDelBtn from "@/components/Ui/Products/category/CatEditNDelBtn/CatEditNDelBtn";
import CategoryPopup from "@/components/AdminDashboard/Products/Category/CategoryPopup/CategoryPopup";
import Link from "next/link";
import CategoryTable from "@/components/AdminDashboard/Products/Category/CategoryTable/CategoryTable";
import CatAddForm from "@/components/AdminDashboard/Products/Category/CatAddForm/CatAddForm";
import CategoryAddBtn from "@/components/Ui/Products/category/CategoryAddBtn/CategoryAddBtn";

const Categories = async () => {
  await dbConnect();
  const categories = await category.find().sort({ createdAt: -1 }).lean();
  const formattedCategories = categories.map((cat) => ({
    ...cat,
    _id: cat._id.toString(),
  }));

  return (
    <div className="p-6 relative h-screen">
      <div className=" flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Product Categories</h1>
        <CategoryAddBtn />
      </div>

      {formattedCategories.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
          <CategoryTable categories={JSON.stringify(formattedCategories)} />
        </div>
      )}
    </div>
  );
};

export default Categories;
