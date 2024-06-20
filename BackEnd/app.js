require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

// Import de la base de données

const mongoose = require('mongoose')

// Import du Router des requêtes sur les livres

const bookRoutes = require('./Routes/book')

// Import du Router des requêtes utilisateurs

const userRoutes = require('./Routes/user')

// Connection à l'API MongoDB

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB résussie !'))
  .catch(() => console.log('Connexion à MongoDB échoué'))

const app = express()

// Autorisation pour les CORS

app.use(bodyParser.json())

app.use((req, res, next) => {
  // Permet d'accéder à notre API depuis n'importe quelle origine (*)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Permet d'ajouter les headers mentionnés aux aux requêtes envoyées vers notre API
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  // Permet d'envoyer des requêtes avec les méthodes/verbes mentionnées
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

// Enregistrement des routeur Livres et users

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/auth', userRoutes)

app.use('/api/books', bookRoutes)

module.exports = app
