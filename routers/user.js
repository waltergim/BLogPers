const express = require('express')
const multer  = require('multer')
const UserControllers = require('../controllers/user')
const md_auth         = require('../middlewares/authenticate')


const md_upload = multer({
    storage: multer.diskStorage({
      destination: 'uploads/avatar',
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname )

      }
    })
  });

const api = express.Router()

api.get('/user/me',     [md_auth.ausureAuth] ,UserControllers.getMe)
api.get('/users',       [md_auth.ausureAuth], UserControllers.getUsers )
api.post('/user',       [md_auth.ausureAuth, md_upload.single('avatar')], UserControllers.createUser)
api.patch('/user/:id',  [md_auth.ausureAuth, md_upload.single('avatar')], UserControllers.updateUser)
api.delete('/user/:id', [md_auth.ausureAuth], UserControllers.deleteUSer)

module.exports = api