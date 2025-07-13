const Product = require('../models/Product');

// @desc    Récupérer tous les produits (public)
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Récupérer un produit par ID (public)
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
    else return res.status(404).json({ message: 'Produit non trouvé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Créer un produit (admin)
// @route   POST /api/products
// @access  Admin
const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock, isAvailable } = req.body;

    // Récupérer le chemin de l'image uploadée (multer)
    const imagePath = req.file ? req.file.path : null;

    const product = new Product({
      name,
      image: imagePath,
      price,
      description,
      category,
      stock,
      isAvailable,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Erreur création produit :', error.message);
    res.status(400).json({ message: 'Erreur lors de la création du produit' });
  }
};

// @desc    Mettre à jour un produit (admin)
// @route   PUT /api/products/:id
// @access  Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    const { name, price, description, category, stock, isAvailable } = req.body;

    // Si une nouvelle image est uploadée, mettre à jour le chemin
    if (req.file) {
      product.image = req.file.path;
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    product.stock = stock !== undefined ? stock : product.stock;
    product.isAvailable = isAvailable !== undefined ? isAvailable : product.isAvailable;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error('Erreur mise à jour produit :', error.message);
    res.status(400).json({ message: 'Erreur lors de la mise à jour du produit' });
  }
};

// @desc    Supprimer un produit (admin)
// @route   DELETE /api/products/:id
// @access  Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });

    await product.remove();
    res.json({ message: 'Produit supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
