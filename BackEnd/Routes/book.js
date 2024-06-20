const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { upload, processImage } = require('../middleware/mutler-config')

// Import du controlleur

const bookCtrl = require('../controllers/Book')

// Route de la requête GET ALL

router.get('/', bookCtrl.getAllBooks)

// Route de la requête GET BEST RATING

router.get('/bestrating', bookCtrl.getBestRating)

// Route de la requête GET ONE

router.get('/:id', bookCtrl.getOneBook)

// Route de la requête POST

router.post('/', auth, upload, processImage, bookCtrl.createBook)

// Route de la requête PUT

router.put('/:id', auth, upload, processImage, bookCtrl.modifyBook)

// Route de la requête DELETE

router.delete('/:id', auth, bookCtrl.deleteBook)

// Route de la requête POST RATE

router.post('/:id/rating', auth, bookCtrl.addBookRating)

module.exports = router
