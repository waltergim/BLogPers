const express = require('express')
const Menucontroller = require('../controllers/menu')
const md_auth = require('../middlewares/authenticate')



const api = express.Router()


api.post('/menu',[md_auth.ausureAuth], Menucontroller.createMenu)
api.get("/menu" , Menucontroller.getMenu )
api.patch("/menu/:id" ,[md_auth.ausureAuth], Menucontroller.updateMenu)
api.delete("/menu/:id" ,[md_auth.ausureAuth], Menucontroller.deleteMenu)

module.exports =  api
