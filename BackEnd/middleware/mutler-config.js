const multer = require('multer')

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
}

// Création de la constante storage, à passer à multer comme configuration, qui contient la logique nécéssaire pour indiquer à multer où enregistrer les fichiers entrants

// Fonction destination indique à  multer d'enregistrer les fichiers dans le dossier images

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images')
  },

  //   La fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des _ et d'ajouter un timestamp comme nom de fichier
  //   Elle utiliser ensuitela constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée.

  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_')
    const extension = MIME_TYPES[file.mimetype]
    callback(null, name + Date.now() + '.' + extension)
  },
})

//  Exports de notre fonction en lui passant storage et on indique que nous gérons uniquement les téléchargements de fichier images.

module.exports = multer({ storage }).single('image')
