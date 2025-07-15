// services/momoAuth.js
const axios = require('axios');
const base64 = require('base-64');
require('dotenv').config();

async function getAccessToken() {
  const userId = process.env.MOMO_API_USER_ID;
  const apiKey = process.env.MOMO_API_KEY;
  const subscriptionKey = process.env.MOMO_SUBSCRIPTION_KEY;

  const auth = base64.encode(`${userId}:${apiKey}`);

  try {
    const response = await axios.post(
      `${process.env.MOMO_BASE_URL}/collection/token/`,
      null,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          'Ocp-Apim-Subscription-Key': subscriptionKey
        }
      }
    );
    return response.data.access_token;
  } catch (err) {
    console.error('Erreur lors de l\'obtention du token MoMo :', err.response?.data || err.message);
    throw err;
  }
}

module.exports = { getAccessToken };
