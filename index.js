const mongoose = require('mongoose')
const app = require('./app')
const {    
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    API_VERSION,
    IP_SERVER } = require('./constans')

const PORT = process.env.PORT || 3001;

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`)
        .then(() =>{
            console.log('la conexion es buena')
        })
        .catch((error) =>{
            console.log(error)
        })
 
app.listen(PORT,() => {
    console.log("############################")
    console.log("##############APIR REST###############")
    console.log("##########################################")
    console.log(`el servidor esta escuchando en http://${IP_SERVER}:${PORT}/api/${API_VERSION}`)
})