const Post = require('../models/post')
const { getFileName } = require('../utils/image')

const createPost = async(req,res)=>{
    const post = new Post(req.body)
    post.created_at  = new Date()

    

    const imagePath =  getFileName(req.file)
    post.miniature  = imagePath

    post.save()
        .then((postStorage)=>{
            res.status(201).send(postStorage)
        })
        .catch ((error) =>{
            res.status(400).send({error: "error al crear el post"})
        })

}


const getPost = async(req,res) =>{
    const {page = 1, limit = 10 } = req.query
    const options = {
        page: parseInt(page),
        limit:parseInt(limit),
        sort: {created_at: "desc"}
    }

    Post.paginate({}, options)
        .then((postStorage)=>{
            res.status(200).send(postStorage)
        })
        .catch((error)=>{
            res.status(400).send({error: "error al optener los posteros"})
        })
}

const updatePost = async(req,res) =>{
    const { id } = req.params
    const postData = req.body

    if(req.file){
        const imageName = getFileName(req.file)
        postData.miniature = imageName
    }

    Post.findByIdAndUpdate({_id:id},postData)
        .then(()=>{
            res.status(200).send({msg: "update correcta"})
        })
        .catch((error)=>{
            res.status(400).send({error:"error al actualizar el poste"})
        })

}

const postDelete = async(req,res) =>{
    const {id} = req.params

    Post.findByIdAndDelete(id)
        .then(()=>{
            res.status(200).send({msg: "el post fue elimando correctamente"})
        })
        .catch(()=>{
            res.status(400).send({error: "el post no pudo ser eliminado "})
        })
}



const getPos = async(req,res) =>{
    const { path } = req.params


    Post.findOne({path})
        .then((postStorage) =>{
            if(!postStorage){
                res.status(400).send({msg: "no se encontro ningun post"})
            }
            res.status(200).send({postStorage})
        })
        .catch(()=>{
            res.status(500).send({msg: "este fue un erro"})
        })
         
}

module.exports = {
createPost,
getPost,
updatePost,
postDelete,
getPos
}