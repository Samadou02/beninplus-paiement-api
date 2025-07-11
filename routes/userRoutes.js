const express = require('express');
const router = express.Router();
const { authUser, registerUser, getUsers } = require('../controllers/userController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

// Authentification
router.post('/login', authUser);

// Inscription
router.post('/register', registerUser);

// Liste des utilisateurs - admin uniquement
router.get('/', protect, isAdmin, getUsers);

module.exports = router;
