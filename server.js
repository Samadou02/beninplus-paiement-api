const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { errorHandler } = require('./middlewares/errorMiddleware');
const path = require('path'); // ✅ Ajouté pour gérer les chemins

// Chargement des variables d'environnement
dotenv.config();

// Connexion à MongoDB Atlas
connectDB();

const app = express();

// Middleware pour parser le JSON dans les requêtes
app.use(express.json());

// ✅ Middleware pour servir les images du dossier "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import des routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const momoPayments = require('./routes/momoPayments');

// Routes API
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

app.use('/api/payments/momo', momoPayments);


// Route de base (optionnel)
app.get('/', (req, res) => {
  res.send('API Benin Plus Boutique en ligne');
});

// Middleware gestion globale des erreurs (doit être après les routes)
app.use(errorHandler);

// Port d'écoute
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});
