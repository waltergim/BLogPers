const express = require('express')
const multer = require('multer')
const md_auth = require('../middlewares/authenticate')
const CourseController = require('../controllers/course')

const md_upload = multer({
    storage: multer.diskStorage({
      destination: 'uploads/course',
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname )

      }
    })
  });

const api = express.Router()

api.post('/course', [md_auth.ausureAuth, md_upload.single('miniature')], CourseController.createCurse)
api.get('/course', CourseController.getCourses)
api.patch('/course/:id',[md_auth.ausureAuth, md_upload.single('miniature')], CourseController.updateCourse)
api.delete('/course/:id',[md_auth.ausureAuth], CourseController.deleteCourse)

module.exports = api
