// Import du modèle Book
const Book = require('../models/Book')

// Import du node_module permettant de venir interagir avec les fichiers
const fs = require('fs')

// Logique métier de la requête GET ALL

exports.getAllBooks = (req, res, next) => {
  Book.find()
    .then((books) => res.status(200).json(books))
    .catch((error) => res.status(400).json({ error }))
}

// Logique métier de la requête GET ONE

exports.getOneBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => res.status(200).json(book))
    .catch((error) => res.status(400).json({ error }))
}

// Logique métier de la requête GET BEST RATING

exports.getBestRating = (req, res, next) => {
  Book.find()
    .sort({ averageRating: -1 })
    .limit(3)
    .then((books) => res.status(200).json(books))
    .catch((error) => {
      res.status(404).json({ error })
    })
}

// Logique métier de la reqête POST

exports.createBook = (req, res, next) => {
  const bookObject = JSON.parse(req.body.book)
  delete bookObject._id
  const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`,
    ratings: [],
    averageRating: 0,
  })

  book
    .save()
    .then(() => res.status(201).json({ message: 'Nouveau livre enregistré' }))
}

// Logique métier de la reqête PUT

exports.modifyBook = (req, res, next) => {
  const bookObject = req.file
    ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body }

  delete bookObject._userId
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: 'Modification non autorisée' })
      } else {
        Book.updateOne(
          { _id: req.params.id },
          { ...bookObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Livre modifié' }))
          .catch((error) => res.status(401).json({ error }))
      }
    })
    .catch((error) => {
      res.status(400).json({ error })
    })
}

//  Logique métier de la requête DELETE

exports.deleteBook = (req, res, next) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (book.userId != req.auth.userId) {
        res.status(401).json({ message: 'Supression non-autorisée' })
      } else {
        const filename = book.imageUrl.split('/images')[1]
        fs.unlink(`images/${filename}`, () => {
          Book.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: 'Livre supprimé' })
            })
            .catch((error) => res.status(401).json({ error }))
        })
      }
    })
    .catch((error) => res.status(500).json({ error }))
}

//  Logique métier de la requête POST RATE

exports.addBookRating = (req, res, next) => {
  const bookId = req.params.id
  const userId = req.auth.userId
  const grade = req.body.rating

  Book.findById(bookId)
    .then((book) => {
      const existingRating = book.ratings.find(
        (rating) => rating.userId === userId
      )
      if (existingRating) {
        return res
          .status(400)
          .json({ error: 'Vous avez déjà défini une note pour ce livre ' })
      }

      book.ratings.push({ userId, grade })

      book.updateAverageRating()

      book
        .save()
        .then((updateBook) => res.status(200).json(updateBook))
        .catch((error) => res.status(400).json({ error }))
    })
    .catch((error) => res.status(500).json({ error }))
}
