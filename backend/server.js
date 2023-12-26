import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

const app = express();

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/upload", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Api is running....");
});

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
