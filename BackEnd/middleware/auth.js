const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    // Récupération du token de la requête
    const token = req.headers.authorization.split(' ')[1]
    // Vérification du token avec verify de jwt
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    // Récupération de l'ID du user authentifié
    const userId = decodedToken.userId
    req.auth = {
      userId: userId,
    }
    next()
  } catch (error) {
    res.status(401).json({ error })
  }
}
