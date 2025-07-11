const Order = require('../models/Order');

// @desc    Créer une nouvelle commande (client)
// @route   POST /api/orders
// @access  Privé (client)
const createOrder = async (req, res) => {
  try {
    const { products, totalPrice, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'Pas de produits dans la commande' });
    }

    const order = new Order({
      user: req.user._id,
      products,
      totalPrice,
      paymentMethod,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la commande' });
  }
};

// @desc    Récupérer les commandes de l'utilisateur connecté (client)
// @route   GET /api/orders/myorders
// @access  Privé (client)
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('products.product', 'name price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
  }
};

// @desc    Récupérer toutes les commandes (admin)
// @route   GET /api/orders
// @access  Admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .populate('products.product', 'name price');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// @desc    Mettre à jour le statut d'une commande (admin)
// @route   PUT /api/orders/:id/status
// @access  Admin
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Commande non trouvée' });

    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'Statut manquant' });

    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande' });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
