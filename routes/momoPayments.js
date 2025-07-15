const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const { getAccessToken } = require('../services/momoAuth');
require('dotenv').config();

const router = express.Router();

router.post('/pay', async (req, res) => {
  const { phoneNumber, amount, externalId } = req.body; // externalId = ID commande

  try {
    const token = await getAccessToken();
    const transactionId = uuidv4(); // identifiant unique

    await axios.post(
      `${process.env.MOMO_BASE_URL}/collection/v1_0/requesttopay`,
      {
        amount: amount.toString(),
        currency: 'XOF',
        externalId: externalId,
        payer: {
          partyIdType: 'MSISDN',
          partyId: phoneNumber
        },
        payerMessage: 'Paiement Bénin+',
        payeeNote: 'Merci pour votre commande'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Reference-Id': transactionId,
          'X-Target-Environment': process.env.MOMO_TARGET_ENV,
          'Ocp-Apim-Subscription-Key': process.env.MOMO_SUBSCRIPTION_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    res.status(200).json({
      message: 'Paiement en cours, veuillez confirmer sur votre téléphone.',
      transactionId
    });
  } catch (err) {
    console.error('Erreur initiation paiement :', err.response?.data || err.message);
    res.status(500).json({ error: 'Échec du paiement' });
  }
});

module.exports = router;
