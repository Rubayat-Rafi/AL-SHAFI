"use client";
import Link from "next/link";
const OrdersTable = ({ ords }) => {
  const orders = JSON.parse(ords);
  return (
    <div className=" overflow-x-auto text-nowrap">
      <table className=" border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Customer</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Phone</th>
            <th className="border px-3 py-2">Addresses</th>
            <th className="border px-3 py-2">Items</th>
            <th className="border px-3 py-2">Totals</th>
            <th className="border px-3 py-2">Created At</th>
            <th className="border px-3 py-2">Status</th>
            <th className="border px-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="text-sm">
              <td className="border px-3 py-2">{order.fullName}</td>
              <td className="border px-3 py-2">{order.email}</td>
              <td className="border px-3 py-2">{order.phone}</td>
              <td className="border px-3 py-2">
                {order.addresses.map((addr, i) => (
                  <div key={i}>
                    {addr.address ||
                      `${addr.division || ""} ${addr.district || ""} ${
                        addr.city || ""
                      }`.trim()}
                  </div>
                ))}
              </td>
              <td className="border px-3 py-2">
                {order.items.map((item, i) => (
                  <div key={i}>
                    <strong>
                      <Link href={`/product/product-details/${item?.slug}`}>
                        {item.slug}
                      </Link>
                    </strong>{" "}
                    - Qty: {item.qty} <br />
                    Note: {item.note}
                  </div>
                ))}
              </td>
              <td className="border px-3 py-2">
                Subtotal: {order.totals.subtotal} <br />
                Shipping: {order.totals.shippingTotal} <br />
                Grand Total: {order.totals.grandTotal}
              </td>
              <td className="border px-3 py-2">
                {new Date(order.createdAt).toLocaleString()}
              </td>
              <td className="border px-3 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
