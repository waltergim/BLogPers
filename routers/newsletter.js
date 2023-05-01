const express = require('express')
const NewsletterController = require('../controllers/newsletter')
const md_auth  = require('../middlewares/authenticate')

const api = express.Router()


api.post('/newslatter', NewsletterController.suscribeEmail)
api.get('/newslatter', [md_auth.ausureAuth], NewsletterController.getEmail)
api.delete('/newslatter/:id', [md_auth.ausureAuth], NewsletterController.deleteEmail)

module.exports = api
 