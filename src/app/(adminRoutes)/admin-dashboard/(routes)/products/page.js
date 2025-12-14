export const dynamic = "force-dynamic";
import ProductTable from "@/components/AdminDashboard/Products/Product/ProductTable/ProductTable";
import ProductAddBtn from "@/components/UI/Admin/Product/ProductAddBtn/ProductAddBtn.js";
import { AllProducts } from "@/actions/actions";
const Products = async () => {
  const products = await AllProducts();
  return (
    <div className="p-6 relative">
      <div className=" flex items-center justify-between">
        <h1 className="text-2xl font-bold mb-6">Product</h1>
        <ProductAddBtn />
      </div>
      {products?.length === 0 ? (
        <p className="text-gray-500">No categories found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg shadow-sm bg-white">
          <ProductTable product={JSON.stringify(products)} />
        </div>
      )}
    </div>
  );
};

export default Products;
