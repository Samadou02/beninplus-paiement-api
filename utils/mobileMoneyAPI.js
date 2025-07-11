const axios = require('axios');
const config = require('../config/config');

const pay = async (amount, phoneNumber, orderId) => {
  try {
    const response = await axios.post('https://api.cinetpay.com/v1/payment', {
      api_key: config.mobileMoney.apiKey,
      amount,
      phone_number: phoneNumber,
      order_id: orderId,
      callback_url: config.mobileMoney.callbackUrl,
    });
    return response.data;
  } catch (error) {
    throw new Error('Erreur API Mobile Money');
  }
};

module.exports = { pay };
