const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Atlas connecté');
  } catch (error) {
    console.error('❌ Échec de la connexion à MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
