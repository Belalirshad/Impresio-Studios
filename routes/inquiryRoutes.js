const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");
const Partner = require("../models/Partners");
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");

router.post("/", auth, role("client"), async (req, res) => {
  const { category, date, budget, city, referenceImageUrl } = req.body;
  const partners = await Partner.find({
    services: category,
    status: "verified",
  });
  const matchedIds = partners.map((p) => p.user);

  const inquiry = new Inquiry({
    client: req.user.id,
    category,
    date,
    budget,
    city,
    referenceImageUrl,
    matchedPartners: matchedIds,
  });

  await inquiry.save();
  res.json({ message: "Inquiry created" });
});
module.exports = router;
