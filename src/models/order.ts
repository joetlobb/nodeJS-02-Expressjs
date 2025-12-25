import { model, Schema, Types } from "mongoose";

const orderSchema = new Schema({
  products: [
    {
      productData: {
        type: Object,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  user: {
    email: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
});

export default model("Order", orderSchema);
