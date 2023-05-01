const Newsletter = require('../models/newsletter')


const suscribeEmail = async(req,res) =>{
    const {email} = req.body

    if(!email){
        return  res.status(400).send({msg: "ingresa un mail"})
    }
 
    const newsletter = new Newsletter({email: email.toLowerCase(),})

    newsletter.save()
              .then((newslatterStorage)=>{
             return  res.status(200).send(newslatterStorage)
              })
              .catch(()=>{
                res.status(400).send({error: "email ya registrado"})
              })

}


const getEmail = async(req,res) =>{
  const {page = 1, limit = 10} = req.params


  const option = {
    page: parseInt(page),
    limit: parseInt(limit)
  }


  Newsletter.paginate({}, option)
            .then((emailStorage)=>{
              res.status(200).send(emailStorage)
            })  
            .catch(()=>{
              res.status(400).send({error:'error al optener los emails'})
            })
}

const deleteEmail = async(req,res) =>{
  const { id } = req.params

  Newsletter.findByIdAndDelete(id)
            .then(()=>{
              res.status(200).send({msg:"se elimino correctamente el email"})
            })
            .catch(()=>{
              res.status(400).send({error:"email no eliminado"})
            })
}


module.exports = {
suscribeEmail,
getEmail,
deleteEmail
}