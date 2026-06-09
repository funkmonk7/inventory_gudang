const Product = require("../models/Product");

// GET ALL
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET BY ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produk tidak ditemukan"
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      message: "Produk berhasil ditambahkan",
      product
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produk tidak ditemukan"
      });
    }

    await product.update(req.body);

    res.json({
      message: "Produk berhasil diupdate",
      product
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Produk tidak ditemukan"
      });
    }

    await product.destroy();

    res.json({
      message: "Produk berhasil dihapus"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};