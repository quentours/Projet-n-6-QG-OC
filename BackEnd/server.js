const http = require('http')
const app = require('./app')

// Permet de renvoyer un port valide
const normalizePort = (val) => {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    return val
  }
  if (port >= 0) {
    return port
  }
  return false
}

// Mettre le port dans le .env pour la sécurité
const port = normalizePort(process.env.PORT || '4000')

// Port sur lequelle l'applicaiton est déployée
app.set('port', port)

// Gestion des erreurs

const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.')
      process.exit(1)
      break
    default:
      throw error
  }
}

// Excécution de l'application à quand il y a un appel vers le serveur

const server = http.createServer(app)

// Event Listener consignant le port ou le canal sur lequel le serveur est déployé

server.on('error', errorHandler)
server.on('listening', () => {
  const address = server.address()
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port
  console.log('Listening on ' + bind)
})

// Le serveur écoute le port par défaut ou 3000/4000

server.listen(port)
