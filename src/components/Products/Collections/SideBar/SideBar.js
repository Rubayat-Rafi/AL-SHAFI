export const dynamic = "force-dynamic";

import dbConnect from "@/lib/dbConnect/dbConnect";
import category from "@/models/products/category/category";
import Link from "next/link";
const SideBar = async ({ slug }) => {
  await dbConnect();
  const categories = await category.find().sort({ createdAt: -1 }).lean();
  const formattedCategories = categories.map((cat) => ({
    ...cat,
    _id: cat._id.toString(),
  }));

  return (
    <div className="">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
        Categories
      </h2>
      <div className="flex flex-col space-y-2">
        {formattedCategories?.map((cat) => (
          <Link
            key={cat._id}
            href={`/collections/${cat.slug}`}
            className={`text-gray-700 ${
              cat?.slug !== slug && "hover:bg-slate-300/50"
            }  ${
              cat?.slug === slug && "bg-green-600 text-white"
            }   transition-colors duration-200 px-3 py-2 rounded-md`}
          >
            {cat.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
