const Menu = require('../models/menu')

const createMenu = async(req,res) =>{
    const menu = new Menu(req.body)

    menu.save()
        .then((menuStorage)=>{
            res.status(200).send({menuStorage})
        })
        .catch((error) =>{
            res.status(400).send({msg: "error al crear el munu"})
        })
}

const getMenu = async(req,res)=>{

    const { active } = req.query

    let response = null
    if(active === undefined){
        response = await Menu.find().sort({order:"asc"})
    } else{
        response = await Menu.find({active}).sort({order:"asc"})
    }

    if(!response){
        res.status(400).send({msg: "NO se encontro ningun menu"})
    } else {
        res.status(200).send(response)
    }

}

const updateMenu = async(req,res) =>{
const {id} = req.params

const menuData = req.body

Menu.findByIdAndUpdate({_id: id},menuData)
    .then(()=>{
            res.status(200).send({msg:"actualizacion correcta"})
        })  
    .catch((error)=>{
            res.status(400).send({msg:"error al actualizar el menu"})
        })

}

const deleteMenu = async (req,res) =>{
    const {id}  = req.params

    Menu.findByIdAndDelete({_id:id})
        .then(()=>{
            res.status(200).send({msg:"menu eliminado correctamente"})
        })
        .catch((error) =>{
            res.status(400).send({msg:"error al eliminar el menu"})
        })
}

module.exports = {
    createMenu,
    getMenu,
    updateMenu,
    deleteMenu
}