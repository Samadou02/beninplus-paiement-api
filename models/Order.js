const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 },
    }
  ],
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ['PENDING', 'PAID', 'FAILED', 'SHIPPED', 'DELIVERED'],
    default: 'PENDING',
  },
  paymentMethod: { type: String, default: 'mobile_money' },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
