export const dynamic = "force-dynamic";
import dbConnect from "@/lib/dbConnect/dbConnect";
import Product from "@/models/products/product/product";
import GalleryImages from "@/components/Products/GalleryImages/GalleryImages";
import RelatedProducts from "@/components/Products/RelatedProducts/RelatedProducts";
const Collections = async ({ params }) => {
  await dbConnect();
  const { slug } = await params;
  const product = await Product.findOne({ slug }).lean();
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Product Not Found!
      </div>
    );
  }
  const formattedProduct = {
    ...product,
    _id: product._id.toString(),
    createdAt: product.createdAt?.toString(),
    updatedAt: product.updatedAt?.toString(),
  };

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* LEFT – PRODUCT GALLERY */}
        <div className="w-full">
          <GalleryImages
            thumbnail={JSON.stringify(formattedProduct?.thumbnail.secure_url)}
            images={JSON.stringify(formattedProduct?.images)}
          />
        </div>

        {/* RIGHT – PRODUCT INFO */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{formattedProduct.productName}</h1>

          <p className="text-gray-500">Category: {formattedProduct.category}</p>

          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold text-green-600">
              ৳{formattedProduct.offerPrice}
            </span>
            <span className="text-xl line-through text-gray-400">
              ৳{formattedProduct.regularPrice}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            Stock:{" "}
            {formattedProduct.stock > 0 ? (
              <span className="text-green-600 font-semibold">
                Available ({formattedProduct.stock})
              </span>
            ) : (
              <span className="text-red-600 font-semibold">Out of Stock</span>
            )}
          </p>

          <p className="text-sm">
            Shipping:
            <span className="font-semibold capitalize">
              {" "}
              {formattedProduct.shipping_fee}
            </span>
          </p>

          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-900 duration-200">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {formattedProduct.descriptions}
        </p>
      </div>
      <div>
        <RelatedProducts slug={product?.category} />
      </div>
    </div>
  );
};

export default Collections;
