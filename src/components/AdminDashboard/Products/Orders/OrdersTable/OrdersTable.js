export const dynamic = "force-dynamic"
import Link from "next/link";
import OrderDelBtn from "@/components/Ui/Orders/OrderDelBtn/OrderDelBtn";
import BulkDeleteBtn from "@/components/Ui/Orders/BulkDeleteBtn/BulkDeleteBtn";

const OrdersTable = ({ orders }) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-500 text-lg">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="">

      <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Desktop & Tablet Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">
                  Address
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">
                  Items
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
                <th className="px-6 py-4 text-center">
                  <BulkDeleteBtn />
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Customer Name */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.fullName || "N/A"}
                  </td>

                  {/* Email + Phone */}
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {order.email}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">
                        {order.phone}
                      </span>
                    </div>
                  </td>

                  {/* Address (hidden on <md) */}
                  <td className="px-6 py-4 text-sm text-gray-600 hidden md:table-cell">
                    <div className="space-y-1 text-xs max-w-xs">
                      {order.addresses && order.addresses.length > 0 ? (
                        order.addresses.map((addr, i) => (
                          <div key={i}>
                            {addr.address ||
                              [addr.division, addr.district, addr.city]
                                .filter(Boolean)
                                .join(", ") ||
                              "No address"}
                          </div>
                        ))
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </div>
                  </td>

                  {/* Items (hidden on <lg) */}
                  <td className="px-6 py-4 text-sm text-gray-700 hidden lg:table-cell">
                    <div className="space-y-2 text-xs">
                      {order.items?.map((item, i) => (
                        <div key={i}>
                          <strong>
                            <Link
                              href={`/product/product-details/${item.slug}`}
                              className="text-blue-600 hover:underline"
                            >
                              {item.name || item.slug}
                            </Link>
                          </strong>{" "}
                          × {item.qty}
                          {item.note && (
                            <p className="text-gray-500 italic mt-1">
                              Note: {item.note}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Total */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    <div>
                      <div className="text-lg">৳{order.totals.grandTotal}</div>
                      {order.totals.shippingTotal > 0 && (
                        <div className="text-xs text-gray-500">
                          +৳{order.totals.shippingTotal} shipping
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Date (hidden on <sm) */}
                  <td className="px-6 py-4 text-sm text-gray-600 hidden sm:table-cell whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>

                  {/* Status Badge */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status?.charAt(0).toUpperCase() +
                        order.status?.slice(1)}
                    </span>
                  </td>

                  {/* Delete Button */}
                  <td className="px-6 py-4 text-center">
                    <OrderDelBtn id={order._id} flag="del" />
                  </td>

                  {/* Bulk Checkbox */}
                  <td className="px-6 py-4 text-center">
                    <OrderDelBtn id={order._id} flag="bulk" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View (below md) */}
        <div className="md:hidden divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order._id} className="p-5 bg-white hover:bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-900">
                    {order.fullName}
                  </p>
                  <p className="text-sm text-gray-600">{order.email}</p>
                  <p className="text-xs text-gray-500">{order.phone}</p>
                </div>

                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    order.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <div className="text-sm space-y-2 text-gray-700">
                <p>
                  <strong>Total:</strong> ৳{order.totals.grandTotal}
                  {order.totals.shippingTotal > 0 &&
                    ` (+৳${order.totals.shippingTotal} ship)`}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>

                {/* Mobile Items Summary */}
                {order.items && (
                  <details className="text-xs mt-2">
                    <summary className="cursor-pointer font-medium text-blue-600">
                      View {order.items.length} item(s)
                    </summary>
                    <div className="mt-2 space-y-1 pl-2 border-l-2 border-gray-300">
                      {order.items.map((item, i) => (
                        <div key={i}>
                          <Link
                            href={`/product/product-details/${item.slug}`}
                            className="text-blue-600 hover:underline"
                          >
                            {item.name || item.slug}
                          </Link>{" "}
                          × {item.qty}
                          {item.note && ` — ${item.note}`}
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>

              <div className="flex gap-3 mt-4">
                <OrderDelBtn id={order._id} flag="del" />
                <OrderDelBtn id={order._id} flag="bulk" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
