import { AllUserOrders } from "@/actions/actions"

export const dynamic = "force-dynamic"

const orders = async() => {

    const orders = await AllUserOrders();

  return (
    <div>orders</div>
  )
};

export default orders;