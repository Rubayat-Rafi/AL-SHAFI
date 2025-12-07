export const dynamic = "force-dynamic";
import { ordersByStatus } from "@/actions/actions";
import OrdersTable from "@/components/AdminDashboard/Products/Orders/OrdersTable/OrdersTable";
import Link from "next/link";

const OrdersPage = async ({ params }) => {
  const { status } = await params;
  const orders = await ordersByStatus({ status });
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="">
          <div className=" flex items-center justify-between">
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                All Orders
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage and track customer orders ({orders?.length || 0} total)
              </p>
            </div>
            <div className="">
              {/* Dropdown */}
              <details className="relative">
                <summary className="cursor-pointer rounded-md border border-slate-300 px-4 py-2 text-sm shadow-sm hover:bg-gray-50">
                  orders status
                </summary>
                <div className="absolute right-0 mt-2 w-40 rounded-md border border-slate-300 bg-white z-50 shadow-lg">
                  <Link
                    href={"/admin-dashboard/orders/pending"}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    pending
                  </Link>
                  <Link
                    href={"/admin-dashboard/orders/in_review"}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    in_review
                  </Link>
                  <Link
                    href={"/admin-dashboard/orders/delivered"}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    delivered
                  </Link>
                </div>
              </details>
            </div>
          </div>

          <div className="p-4 sm:p-6 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800">Order List</h2>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-6">
            <OrdersTable orders={orders || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
