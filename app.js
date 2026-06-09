require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database");

// Routes
const authRoutes = require("./routes/authRoutes");
const supplierRoutes = require("./routes/supplierRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Default Route
app.get("/", (req, res) => {
    res.json({
        message: "Inventory API Running"
    });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/suppliers", supplierRoutes);
app.use("/api/products", productRoutes);
app.use("/api/transactions", transactionRoutes);

// Database Connection
sequelize.authenticate()
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.error("Database Error:", err.message);
    });

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});