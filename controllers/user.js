const User = require('../models/user')
const bcrypt = require('bcrypt')
const image  = require('../utils/image')

const getMe = async(req,res) =>{
    const {user_id}  = req.user

    const response = await User.findById(user_id)

    if(!response){
        res.status(400).send({msg: "no se ha encontrado el usuario"})
    }else{
        res.status(200).send(response)
    }
 
}

const getUsers = async(req,res) =>{

    const {active} = req.query

    let response = null

    if(active === undefined){
        response = await User.find()
    }else{
        response = await User.find({active})
    }
 
    res.status(200).send({response})

}

const createUser = async (req,res) =>{
    
    const {password} = req.body

    const user = new User({...req.body,active: false})
    const salt = bcrypt.genSaltSync(10)
    const hasPassword = bcrypt.hashSync(password,salt)
    user.password = hasPassword
 

    if(req.file){
        const imageName = image.getFileName(req.file)
         user.avatar = imageName
        
    }

 
    user.save()
        .then((useStorage)=>{
            res.status(201).send({useStorage})
    }).catch((error)=>{
        res.status(400).send({msg:"error al crear el usuario"})
    })
}


const updateUser = async(req,res) =>{
    const { id }    = req.params

    const userData = req.body 


    if(userData.password){
        const salt = bcrypt.genSaltSync(10)
        const hasPassword = bcrypt.hashSync(userData.password, salt)
        userData.password = hasPassword
    } else{
        delete userData.password
    }

    if(req.file){
        const imageName = image.getFileName(req.file)
        userData.avatar = imageName
    }

    User.findByIdAndUpdate({_id: id}, userData)
        .then(()=>{
            res.status(200).send({msg:"actualizacion correcta"})
        })  
        .catch((error)=>{
            res.status(400).send({msg:"error al actualizar el usuario"})
        })
}


const deleteUSer = async(req,res) =>{
    const {id}  = req.params

    User.findByIdAndDelete({_id:id})
        .then(()=>{
            res.status(200).send({msg:"usuario eliminado correctamente"})
        })
        .catch((error) =>{
            res.status(400).send({msg:"error al eliminar el usuario"})
        })
}

module.exports= { 
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUSer
}