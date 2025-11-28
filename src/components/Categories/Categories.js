export const dynamic = "force-dynamic";
import { AllCategories } from "@/app/actions/actions";
import Link from "next/link";
const Categories = async () => {
  const categories = await AllCategories();
  return (
    <div className="px-4 py-5 ">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories?.map((categ) => (
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
