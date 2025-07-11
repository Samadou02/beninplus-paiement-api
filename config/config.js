module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'changeme', // clé secrète JWT
  jwtExpire: '30d',

  mobileMoney: {
    provider: process.env.MOBILE_MONEY_PROVIDER || 'cinetpay', // ex: cinetpay, paydunya
    apiKey: process.env.MOBILE_MONEY_API_KEY || '',
    apiSecret: process.env.MOBILE_MONEY_API_SECRET || '',
    callbackUrl: process.env.MOBILE_MONEY_CALLBACK_URL || 'https://tondomaine.com/api/payments/callback',
  },

  roles: {
    ADMIN: 'ADMIN',
    CLIENT: 'CLIENT',
  },

  messages: {
    unauthorized: 'Accès non autorisé',
    notFound: 'Ressource non trouvée',
    serverError: 'Erreur serveur',
  },
};
