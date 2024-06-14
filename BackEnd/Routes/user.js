const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/User')

// Route de la requête POST SIGNUP

router.post('/', userCtrl.signup)

// Route de la requête POST LOGIN

router.post('/', userCtrl.login)

module.exports = router
