const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/User')

// Route de la requête POST SIGNUP

router.post('/signup', userCtrl.signup)

// Route de la requête POST LOGIN

router.post('/login', userCtrl.login)

module.exports = router
