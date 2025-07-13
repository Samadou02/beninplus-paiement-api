const multer = require('multer');
const path = require('path');

// 📁 Configuration du stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // 📂 Dossier de destination (créé à la racine du projet)
  },
  filename: function (req, file, cb) {
    // ⏱ Nom du fichier : timestamp + extension
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    cb(null, uniqueName);
  }
});

// 🔒 Filtre pour n’accepter que les fichiers image
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('❌ Seuls les fichiers image sont autorisés.'), false);
  }
};

// 📦 Création de l’instance multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // limite à 5MB
});

module.exports = upload;
