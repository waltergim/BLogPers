const User = require('../models/user')
const bcryp = require('bcrypt')
const jwt = require('../utils/jwt')

const register = async (req,res) =>{
   const {firstname,lastname,email,password}  = req.body

    if(!email) res.status(400).send({msg: "Por favor ingrese el email"})
    if(!password) res.status(400).send({msg: "Por favor ingrese el password"})

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
        password
    })

    const salt = bcryp.genSaltSync(10);
    const hashPassword = bcryp.hashSync(password,salt)
    user.password = hashPassword
    
    user.save()
    .then(userStorage => userStorage.toJSON())
    .then(savedAnduserStorage => {
        res.status(200).json({
            msg:"Usuario enviado correctamente",
            savedAnduserStorage});
    })
    .catch(error => {
        res.status(400).send({ error: "Error al enviar el usuario" });
    });
 
}

const login = (req,res) =>{
    const {email, password} = req.body
    if(!email) res.status(400).send({msg: "Por favor ingrese el email"})
    if(!password) res.status(400).send({msg: "Por favor ingrese el email"})


    const emailtoLowerCase = email.toLowerCase()

 
        User.findOne({email: emailtoLowerCase})
        .then( (userStorage)=>{
        if (!userStorage) {
        res.status(401).send({ msg: "Usuario no encontrado" });
         } else {
            bcryp.compare(password, userStorage.password, (bcrypError, check) =>{
                if(bcrypError){
                    res.status(500).sned({msg: "error del servidor"})
                } else if(!check){
                    res.status(500).send({msg: "error del servidor"})
                } else if(!userStorage.active){
                    res.status(401).send({msg: "Usuario no activo"})
                } else{
                    res.status(200).send({
                        access:  jwt.createAccessToken(userStorage),
                        refres:  jwt.createRefreshTOken(userStorage)
                    })
                }
            })
        }
        }) 
    
        .catch((error) =>{
            res.status(400).json({error: "error del servidor"})
        })    
}


const refreshAccessRoken = (req,res) =>{
    const { token } = req.body

    if(!token) res.status(400).send({msg: "el token"})

    const { user_id } = jwt.decoder(token)

    User.findOne({_id : user_id})
        .then((userStorage)=>{
            res.status(200).send({
                accessToken: jwt.createAccessToken(userStorage)
            })
        })
        .catch((error) =>{
            res.status(500).send({msg: "error del servidor"})
        })

}



module.exports = {
    register,
    login,
    refreshAccessRoken
}