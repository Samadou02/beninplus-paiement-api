const express = require('express');
const router = express.Router();
const { handlePaymentCallback } = require('../controllers/paymentController');

// Endpoint callback Mobile Money
router.post('/callback', handlePaymentCallback);

module.exports = router;
