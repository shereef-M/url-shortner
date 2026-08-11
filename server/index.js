const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

const urlRoutes = require("./routes/urlRoutes");
app.use("/api/urls", urlRoutes);

app.get("/", (req, res) => {
  res.json({ message: "URL Shortner API is working " });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
