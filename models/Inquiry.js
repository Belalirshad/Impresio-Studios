const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  category: String,
  date: Date,
  budget: Number,
  city: String,
  referenceImageUrl: String,
  matchedPartners: [mongoose.Schema.Types.ObjectId],
  status: {
    type: String,
    enum: ["new", "responded", "booked", "closed"],
    default: "new",
  },
});

module.exports = mongoose.model("Inquiry", InquirySchema);
