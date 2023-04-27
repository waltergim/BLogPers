const express = require('express')
const authCOntrollers = require('../controllers/auth')

const api = express.Router()

api.post('/auth/register', authCOntrollers.register)
api.post('/auth/login', authCOntrollers.login)
api.post('/auth/refresh_access_token', authCOntrollers.refreshAccessRoken)

module.exports = api