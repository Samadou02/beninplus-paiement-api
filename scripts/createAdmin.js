const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connecté à MongoDB'))
  .catch(err => {
    console.error('❌ Erreur de connexion', err);
    process.exit(1);
  });

const createAdmin = async () => {
  try {
    // Vérifier si un admin existe déjà
    const existingAdmin = await User.findOne({ email: 'admin@beninplus.com' });
    if (existingAdmin) {
      console.log('ℹ️ Un administrateur existe déjà.');
      process.exit();
    }

    const admin = new User({
      name: 'Admin',
      email: 'admin@beninplus.com',
      password: 'admin123', // en clair, sera hashé automatiquement
      role: 'ADMIN',
    });

    await admin.save();
    console.log('✅ Admin créé avec succès');
    process.exit();
  } catch (err) {
    console.error('❌ Erreur création admin', err);
    process.exit(1);
  }
};

createAdmin();
