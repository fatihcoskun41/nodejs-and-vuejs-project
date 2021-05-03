const express = require('express')
//const path = __dirname + '/views/'

const main = require('./routes/api/route')



const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')



/* var corsOptions = {
    origin: "http://localhost:8080"
  };
 */
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
// app.use(express())

app.use(cors()) 

app.use('/',main)

app.use((req,res)=>{
    res.status(404)
    .sendFile(path.join(__dirname,'./views/error.html'))
})




const PORT = process.env.PORT || 5000

app.listen(PORT,()=>console.log("Server run at port " +PORT))
