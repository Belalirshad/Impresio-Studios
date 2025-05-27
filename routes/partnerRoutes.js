const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const role = require("../middlewares/role");
const Partner = require("../models/Partners");

router.post("/onboarding", auth, role("partner"), async (req, res) => {
  const { services, aadhar, portfolio } = req.body;
  const partner = new Partner({
    user: req.user.id,
    services,
    aadhar,
    portfolio,
  });
  await partner.save();
  res.json({ message: "Onboarding submitted" });
});

router.get("/leads", auth, role("partner"), (req, res) => {
  // TODO: Fetch matched inquiries
});
module.exports = router;
