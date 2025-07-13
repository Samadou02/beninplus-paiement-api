const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload'); // ✅ Import du middleware Multer

// Routes publiques
router.get('/', getAllProducts);
router.get('/:id', getProductById);

// Routes admin protégées
// ✅ Ajout du middleware upload.single('image') pour gérer le champ image
router.post('/', protect, isAdmin, upload.single('image'), createProduct);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);

module.exports = router;
