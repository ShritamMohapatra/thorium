const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId;

let orderSchema = new mongoose.Schema(
  {
    userId: { type: objectId, ref: "userModel" },
    productId: { type: objectId, ref: "Product" },
    amout: { type: Number },
    isFreeAppuser: { Type: Boolean },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("orderDetails", orderSchema);
