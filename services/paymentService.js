const processPaymentResponse = (response) => {
  // Exemple fictif de traitement réponse API Mobile Money
  if (response.status === 'SUCCESS') {
    return {
      success: true,
      transactionId: response.transactionId,
      message: 'Paiement réussi',
    };
  } else {
    return {
      success: false,
      message: response.errorMessage || 'Paiement échoué',
    };
  }
};

module.exports = { processPaymentResponse };
