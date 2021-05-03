const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.connect('mongodb+srv://fatihcoskun:159852147@cluster0.tj8hz.mongodb.net/query?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
})
.then(console.log("Query database connected"))
.catch(err=>console.log(err))


const QuerySchema = new Schema({
   
    request_info:{
        type:Array,
        required:true,
      
    },
   
   results:{
       type:Array,
       require:true
   }
})


module.exports = mongoose.model('queryschemas',QuerySchema)