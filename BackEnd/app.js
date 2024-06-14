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
  .connect(
    'mongodb+srv://quentinguihard:tblBN8uApwKEG8PG@clustergrimoire.po2y6rn.mongodb.net/?retryWrites=true&w=majority&appName=ClusterGrimoire',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB résussie !'))
  .catch(() => console.log('Connexion à MongoDB échoué'))

const app = express()

// Autorisation pour les CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  next()
})

// Enregistrement des routeur Livres et users

app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/books', bookRoutes)

app.use('/api/auth', userRoutes)

app.use(bodyParser.json())

module.exports = app
