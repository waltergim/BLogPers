const express = require('express')
const multer = require('multer')
const PostController = require('../controllers/post')
const md_auth = require('../middlewares/authenticate')

const md_upload = multer({
    storage: multer.diskStorage({
      destination: 'uploads/blog',
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname )

      }
    })
  });

 

const api = express.Router()



api.post('/post', [md_auth.ausureAuth, md_upload.single('miniature')], PostController.createPost)
api.get('/post',PostController.getPost )
api.patch('/post/:id', [md_auth.ausureAuth, md_upload.single('miniature')], PostController.updatePost )
api.delete('/post/:id' ,[ md_auth.ausureAuth], PostController.postDelete)
api.get('/post/:path',PostController.getPos)

module.exports = api