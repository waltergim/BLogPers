const express = require('express')
const { API_VERSION }     = require('./constans')
const cors = require('cors')
const app = express()

//importar rutas
const authRouters = require('./routers/auth')
const userRouters = require('./routers/user') 


//BODYPARSE YA NO ES NECESARIO EXPRESS LO TIENE 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//estatico
app.use(express.static('uploads'))

//cors
app.use(cors())

//configuracion rutas
app.use(`/api/${API_VERSION}`,authRouters)
app.use(`/api/${API_VERSION}`,userRouters)

module.exports = app