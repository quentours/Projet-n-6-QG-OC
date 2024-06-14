const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
  title: { type: String, requiered: true },
  author: { type: String, requiered: true },
  imageUrl: { type: String, requiered: true },
  year: { type: Number, required: true },
  genre: { type: String, requiered: true },
  ratings: [
    {
      userId: { type: String, required: true },
      grade: { type: Number, required: true, min: 0, max: 5 },
    },
  ],
  averageRating: { type: Number, required: true, default: 0 },
})

bookSchema.methods.updateAverageRating = function () {
  const sum = this.ratings.reduce((total, rating) => total + rating.grade, 0)
  this.averageRating = this.ratings.length ? sum / this.ratings.length : 0
  return this.averageRating
}

module.exports = mongoose.model('Book', bookSchema)
