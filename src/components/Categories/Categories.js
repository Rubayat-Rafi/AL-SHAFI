export const dynamic = "force-dynamic";

import dbConnect from "@/lib/dbConnect/dbConnect";
import Category from "@/models/products/category/category";
import Link from "next/link";

const Categories = async () => {
  await dbConnect();

  const categories = await Category.find().sort({ createdAt: -1 }).lean();
  const formattedCategories = categories.map((cat) => ({
    ...cat,
    _id: cat._id.toString(),
  }));

  return (
    <div className="px-4 py-5 ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {formattedCategories?.map((categ) => (
          <Link
            key={categ._id}
            href={`/collections/${categ.slug}`}
            className="block bg-white hover:bg-green-50 border border-gray-200  shadow-sm py-2 text-center transition transform hover:scale-105 duration-200"
          >
            <p className="text-gray-700 font-medium">{categ?.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
