export const dynamic = "force-dynamic";
import { AllUserOrders } from "@/actions/actions";
import OrdersTable from "@/components/AdminDashboard/Products/Orders/OrdersTable/OrdersTable";
import Container from "@/components/Container/Container";
import dbConnect from "@/lib/dbConnect/dbConnect";
const orders = async () => {
  await dbConnect();
  const orders = await AllUserOrders();
  return (
    <Container>
      <div className="w-10/12 mx-auto ">
        <OrdersTable ords={JSON.stringify(orders)} />
      </div>
    </Container>
  );
};

export default orders;
