const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
connectDB();
app.use(express.json());

// Routes

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/partner", require("./routes/partnerRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/inquiry", require("./routes/inquiryRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
