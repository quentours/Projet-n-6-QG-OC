const mongoose = require('mongoose')

// Importation du validator pour vérifier que deux utilisateurs n'utilisent pas la même adresse mail
// Ce package permet aussi de prévalider les informations avant de les enregistrer.
// le mot clé unique permet aussi de vérifier que deux users n'utilisent pas la même adresse mail

const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email : {type : String, required: true, unique : true},
    password : {type : String, required : true},
})

// Application du plugin validator au userSchema

userSchema.plugin(uniqueValidator)

// Export

module.exports = mongoose.model('User', userSchema)