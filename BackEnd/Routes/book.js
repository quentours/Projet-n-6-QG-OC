const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const multer = require('../middleware/mutler-config')

// Import du controlleur

const bookCtrl = require('../controllers/Book')

// Route de la requête GET ALL

router.get('/', auth, bookCtrl.getAllBooks)

// Route de la requête GET ONE

router.get('/id', auth, bookCtrl.getOneBook)

// Route de la requête GET BEST RATING

router.get('/bestrating', auth, bookCtrl.getBestRating)

// Route de la requête POST

router.post('/', auth, multer, bookCtrl.createBook)

// Route de la requête PUT

router.put('/:id', auth, multer, bookCtrl.modifyBook)

// Route de la requête DELETE

router.delete('/:id', auth, bookCtrl.deleteBook)

// Route de la requête POST RATE

router.post('/:id/rating', auth, bookCtrl.addBookRating)

module.exports = router
