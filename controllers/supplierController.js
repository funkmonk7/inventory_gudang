const Supplier = require("../models/Supplier");

// GET ALL
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();

    res.json(suppliers);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET BY ID
exports.getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier tidak ditemukan"
      });
    }

    res.json(supplier);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE
exports.createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);

    res.status(201).json({
      message: "Supplier berhasil ditambahkan",
      supplier
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE
exports.updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier tidak ditemukan"
      });
    }

    await supplier.update(req.body);

    res.json({
      message: "Supplier berhasil diupdate",
      supplier
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// DELETE
exports.deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);

    if (!supplier) {
      return res.status(404).json({
        message: "Supplier tidak ditemukan"
      });
    }

    await supplier.destroy();

    res.json({
      message: "Supplier berhasil dihapus"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
