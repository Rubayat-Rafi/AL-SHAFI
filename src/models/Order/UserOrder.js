import mongoose from "mongoose";
const UserOrderSchema = new mongoose.Schema(
  {
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    addresses: [],
    items: [],
    note: { type: String, default: "" },
    totals: {},
  },
  { timestamps: true }
);
const UserOrder = mongoose.models.userorders || mongoose.model("userorders", UserOrderSchema);
export default UserOrder;
