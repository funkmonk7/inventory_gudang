const Transaction = require("../models/Transaction");
const Product = require("../models/Product");

// GET ALL
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();

    res.json(transactions);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE TRANSACTION
exports.createTransaction = async (req, res) => {
  try {

    const {
      product_id,
      transaction_type,
      quantity
    } = req.body;

    const product = await Product.findByPk(product_id);

    if (!product) {
      return res.status(404).json({
        message: "Produk tidak ditemukan"
      });
    }

    if (transaction_type === "IN") {
      product.stock += quantity;
    }

    if (transaction_type === "OUT") {

      if (product.stock < quantity) {
        return res.status(400).json({
          message: "Stok tidak mencukupi"
        });
      }

      product.stock -= quantity;
    }

    await product.save();

    const transaction = await Transaction.create({
      product_id,
      transaction_type,
      quantity,
      transaction_date: new Date()
    });

    res.status(201).json({
      message: "Transaksi berhasil",
      transaction,
      stock_terbaru: product.stock
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};