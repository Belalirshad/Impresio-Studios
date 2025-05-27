const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  services: [String],
  aadhar: String,
  portfolio: [{ imageUrl: String, description: String, index: Number }],
  status: {
    type: String,
    enum: ["pending", "verified", "rejected"],
    default: "pending",
  },
  adminComment: String,
});

module.exports = mongoose.model("Partner", PartnerSchema);
