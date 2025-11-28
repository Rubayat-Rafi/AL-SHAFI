import ProductEditNDelBtn from '@/components/Ui/Products/product/ProductEditNDelBtn/ProductEditNDelBtn'
import Image from 'next/image'
import React from 'react'

const ProductTable = ({product}) => {
    const formattedProducts = JSON.parse(product)
  return (
    <div>
              <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Thumbnail</th>
              <th className="px-4 py-2 border-b">Product Name</th>
              <th className="px-4 py-2 border-b">Category</th>
              <th className="px-4 py-2 border-b">Offer Price</th>
              <th className="px-4 py-2 border-b">Regular Price</th>
              <th className="px-4 py-2 border-b">Stock</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Shipping</th>
              <th className="px-4 py-2 border-b">Created At</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {formattedProducts.length === 0 ? (
              <tr>
                <td colSpan={10} className="text-center py-4">
                  No Products Found
                </td>
              </tr>
            ) : (
              formattedProducts.map((prod, index) => (
                <tr
                  key={prod._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b">
                    {prod.thumbnail?.secure_url ? (
                      <Image
                        src={prod.thumbnail.secure_url}
                        alt={prod.productName}
                        width={500}
                        height={500}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="px-4 py-2 border-b">{prod.productName}</td>
                  <td className="px-4 py-2 border-b">{prod.category}</td>
                  <td className="px-4 py-2 border-b">${prod.offerPrice}</td>
                  <td className="px-4 py-2 border-b">${prod.regularPrice}</td>
                  <td className="px-4 py-2 border-b">{prod.stock}</td>
                  <td className="px-4 py-2 border-b">{prod.status}</td>
                  <td className="px-4 py-2 border-b">{prod.shipping_fee}</td>
                  <td className="px-4 py-2 border-b">
                    {new Date(prod.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    <ProductEditNDelBtn
                      type={"Edit"}
                      product={JSON.stringify(prod)}
                    />
                    <ProductEditNDelBtn
                      type={"Delete"}
                      product={JSON.stringify(prod)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTable