const { processPaymentResponse } = require('../services/paymentService');

const handlePaymentCallback = async (req, res) => {
  try {
    const response = req.body; // la data envoyée par le provider

    const result = processPaymentResponse(response);

    if (result.success) {
      // Ici tu peux mettre à jour ta commande en base, notifier client, etc.
      res.status(200).json({ message: 'Paiement confirmé' });
    } else {
      res.status(400).json({ message: 'Paiement échoué' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

module.exports = { handlePaymentCallback };
