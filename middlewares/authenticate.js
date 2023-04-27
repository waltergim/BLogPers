const jwt = require('../utils/jwt')

const ausureAuth = (req,res,next) =>{

 if(!req.headers.authorization){
   return res.status(403).send({msg: "la peticion no tiene la cabece de ath"})
 }

 const token = req.headers.authorization.replace('Bearer ','')
  
 try {
    const payload = jwt.decoder(token)
     const {exp} = payload
      
     const currenData = new Date().getTime()

     if(exp <= currenData){
        res.status(400).send({msg: "el token exp"})
     }

     req.user = payload

     next()

 } catch (error) {
  return  res.status(400).send({msg: "token no valido"})
 }

}

module.exports = {
    ausureAuth
}