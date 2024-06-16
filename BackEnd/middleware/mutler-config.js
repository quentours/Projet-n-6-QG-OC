const multer = require('multer')
const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const { error } = require('console')

// Dictionnaire de format

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
}
// Utilisation du stockage mémoire pour appliquer la compression et le changement de format via sharp

const storage = multer.memoryStorage()

const upload = multer({ storage }).single('image')

const processImage = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  // sépare le nom du fichier en utilisant les espaces comme délimiteur
  // remplace ces espaces par des underscore _
  // Sépare l'extension .jpeg ou autre du reste de la String
  // Enlève cette extension, avant de la remplacer par celle choisie par sharp

  const name = req.file.originalname
    .split(' ')
    .join('_')
    .split('.')
    .slice(0, -1)
    .join('.')
  const filename = `${name}${Date.now()}.webp`
  const outputPath = path.join('images', filename)

  sharp(req.file.buffer)
    .webp({ quality: 50 })
    .toFile(outputPath)
    .then(() => {
      req.file.filename = filename
      req.file.path = outputPath
      next()
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}

module.exports = { upload, processImage }
