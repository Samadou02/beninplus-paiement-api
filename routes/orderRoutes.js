const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

// Commande client
router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);

// Admin
router.get('/', protect, isAdmin, getAllOrders);
router.put('/:id/status', protect, isAdmin, updateOrderStatus);

module.exports = router;
