const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
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
    const passwordHash = await bcrypt.hash('admin123', 10);

    const admin = new User({
      name: 'Admin',
      email: 'admin@beninplus.com',
      password: passwordHash,
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
