import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    invoice: {
      type: String,
      required: true,
      unique: true,
      match: /^[A-Za-z0-9_-]+$/,
      maxlength: 50,
    },

    recipient_name: {
      type: String,
      required: true,
      maxlength: 100,
    },

    recipient_phone: {
      type: String,
      required: true,
      match: /^[0-9]{11}$/,
    },

    recipient_email: {
      type: String,
      required: false,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },

    recipient_address: {
      type: String,
      required: true,
      maxlength: 250,
    },

    cod_amount: {
      type: Number,
      required: true,
      min: 0,
    },

    note: {
      type: String,
      required: false,
      maxlength: 250,
    },


    total_lot: {
      type: Number,
      required: false,
      min: 1,
    },

    delivery_type: {
      type: Number,
      required: false,
      enum: [0, 1],
      default: 0,
    },
  },
  { timestamps: true }
);

const SteadFastOrder =
  mongoose.models.orders || mongoose.model("orders", OrderSchema);
export default SteadFastOrder;
