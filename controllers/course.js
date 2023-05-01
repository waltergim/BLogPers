const Course = require('../models/course')
const { getFileName } = require('../utils/image')

const createCurse = async(req,res) =>{
      
    const course = new Course(req.body)

    const imagePath = image.getFileName(req.file)
    course.miniature = imagePath

    course.save()
          .then((courseStorake)=>{
            res.status(200).send(courseStorake)
          })
          .catch((error)=>{
            res.status(400).send({error: "El curso no fue guardado"})
          })

}

const getCourses = async(req,res) =>{

    const {page = 1, limit = 10} = req.query

    const option = {
        page: parseInt(page),
        limit: parseInt(limit)
    }

   Course.paginate({}, option)
         .then((courses)=>{
    res.status(200).send(courses)
 })
        .catch((error)=>{
    res.status(400).send({msg: "error al obtener los cursos"})
 })

}

const updateCourse = async(req,res)=>{
    const {id} = req.params

    const courseData = req.body

    if(req.file){
        const imageName = getFileName(req.file)
        courseData.miniature = imageName
    }

    Course.findByIdAndUpdate({_id:id}, courseData)
          .then(()=>{
                res.status(200).send({msg:"actualizacion correcta"})
            })  
          .catch((error)=>{
                res.status(400).send({msg:"error al actualizar el curso"})
            })
         
}

const deleteCourse = async(req,res)=>{
    const {id}  = req.params

    Course.findByIdAndDelete({_id:id})
        .then(()=>{
            res.status(200).send({msg:"curso eliminado correctamente"})
        })
        .catch((error) =>{
            res.status(400).send({msg:"error al eliminar el curso"})
        })
}

module.exports ={
createCurse,
getCourses,
updateCourse,
deleteCourse
}