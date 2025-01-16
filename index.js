const routerApi = require('./routes')
const cors = require('cors')
const express = require('express')
const app = express()
const port = 3000
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandler')

app.use(express.json())
const whitelist = ['http://localhost:5500', 'https://api-node-7f5c.onrender.com']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('No permitido'))
    }
  }
}
app.use(cors(options)) // si no se coloca nada en los parametros, se permite a todos los origenes

app.get('/', (request, response) => {
  response.send('Hola mi server en express')
})

app.get('/nueva-ruta', (request, response) => {
  response.send('Hola, soy una nueva ruta')
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log('El servidor esta corriendo en el puerto: ', port)
})
