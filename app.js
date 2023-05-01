const express = require('express')
const { API_VERSION }     = require('./constans')
const cors = require('cors')
const app = express()

//importar rutas
const authRouters  = require('./routers/auth')
const userRouters  = require('./routers/user') 
const menuRoutuers = require('./routers/menu')
const courseRouter = require('./routers/course')
const blogRouters  = require('./routers/post')
const newslettersRouters  = require('./routers/newsletter')

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
app.use(`/api/${API_VERSION}`,menuRoutuers)
app.use(`/api/${API_VERSION}`,courseRouter)
app.use(`/api/${API_VERSION}`,blogRouters)
app.use(`/api/${API_VERSION}`,newslettersRouters)

module.exports = app