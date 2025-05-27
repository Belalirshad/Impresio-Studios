const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const Partner = require("../models/Partners");

router.get("/verifications", auth, role("admin"), async (req, res) => {
  const pending = await Partner.find({ status: "pending" }).populate("user");
  res.json(pending);
});

router.put("/verify/:id", auth, role("admin"), async (req, res) => {
  const { status, comment } = req.body;
  await Partner.findByIdAndUpdate(req.params.id, {
    status,
    adminComment: comment,
  });
  res.json({ message: "Updated successfully" });
});

// Total users, partners, inquiries, etc.
router.get("/kpis", auth, role("admin"), async (req, res) => {
  const totalClients = await User.countDocuments({ role: "client" });
  const totalPartners = await User.countDocuments({ role: "partner" });
  const pendingVerifications = await Partner.countDocuments({
    status: "pending",
  });
  const inquiries = await Inquiry.countDocuments();
  res.json({ totalClients, totalPartners, pendingVerifications, inquiries });
});

module.exports = router;
