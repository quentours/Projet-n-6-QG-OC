// Import du modèle User

const User = require('../models/User')

// Import de jsonwebtoken

const jwt = require('jsonwebtoken')

// Import du package Bcrypt

const bcrypt = require('bcrypt')

// Logique métier de la requête POST SIGNUP

exports.signup = (req, res, next) => {
  // Appel de la fonction de hachage de bcrypt et on lui demande de "saler" (nombre de fois que le mdp est passé dans l'algorythme de cryptage) le pw 10 fois
  // dans le bloc then, on créé un nouvel user et on l'enregistre dans notre DB
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      })
      user
        .save()
        .then(() =>
          res.status(201).json({ message: 'Nouvel utilisateur enregistré' })
        )
        .catch((error) => {
          res.status(500).json({ error })
        })
    })
    .catch((error) => {
      res.status(500).json({ error })
    })
}

// Logique métier la requête POST LOGIN

exports.login = (req, res, next) => {
  // Vérification que l'utilisateur est bien dans la DB avec la méthode mongoose findOne
  // Retour d'un message vague en cas d'erreur pour ne pas induire qu'un utilisateur est bien enregistré ou non sur cette plateforme
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res
          .status(401)
          .json({ message: 'Combinaison email/mot de passe incorrecte' })
      } else {
        // Utilisation de la fonction compare de bcrypt pour vérifer que le mot de passe entré est bon
        // S'il l'est, on renvoi une réponse 200 avec l'ID user et un token
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res
                .status(401)
                .json({ message: 'Combinaison email/mot de passe incorrecte' })
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
                  expiresIn: '24h',
                }),
              })
            }
          })
          .catch((error) => res.status(500).json({ error }))
      }
    })
    .catch((error) => res.status(500).json({ error }))
}
