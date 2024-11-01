const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true,
  })
);

const port = 5000;

// app.get("/", (req, res) => {
//   res.send("working successfully");
// });

mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.error("MongoDB Connection failed:", err));

//Import Routes
const authRoutes = require("./src/routes/auth");
app.use("/auth", authRoutes);

app.listen(port, () => console.log(`server running on port: ${port}`));
