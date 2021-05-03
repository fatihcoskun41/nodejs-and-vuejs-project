const express = require('express');
const mongoDB = require('mongodb')
const router = express.Router();
const moment = require('moment');







router.get('/', async (req, res) => {
    /*     axios.get("http://localhost:5000/api/posts?minDate=2021-03-09&maxDate=2021-03-11").then(resp=>{
            res.json(resp.data.result)
        })
        .catch(err=>console.log(err))
    
    }) */
  
        const result = await (await loadQuery()).find({}).toArray()

        const pagination = req.query.pagination ? parseInt(req.query.pagination):10
        const results ={} 
        results.total = result.length
        results.page =  Math.floor(results.total/pagination)+1
        results.result = result
        console.log(results.result)
        res.json(results)



})


router.post('/', async (req, res,next) => {
    const minId = req.query.minId?parseInt(req.query.minId):0
    const maxId = req.query.maxId?parseInt(req.query.maxId):18985536000
    const minDate=req.query.minDate?Date.parse(req.query.minDate)-10800000:0
    const maxDate = req.query.maxDate?Date.parse(req.query.maxDate)+(79199000-3600000):1899231774000


    const query = await loadQuery()
    

    await query.insertOne({
        request_guid:Math.floor(Math.random()*Math.pow(2,51)),
        minId:req.body.minId,
        maxId:req.body.maxId,
        minDate:Date.parse(req.body.minDate)-10800000,
         maxDate :Date.parse( req.body.maxDate)+(79199000-3600000)
       

    })
 
    res.status(201).send()
})

async function loadQuery() {
    const client = await mongoDB.MongoClient.connect('mongodb+srv://fatihcoskun:fatihcoskun@cluster0.tj8hz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

    const db = client.db('myFirstDatabase').collection('queries')

    return db
}
async function loadPostsCollection(){
    const client = await mongoDB.MongoClient.connect('mongodb://admin:N35m0i7jlL5Sucph@cluster0-shard-00-00.jw70k.mongodb.net:27017,cluster0-shard-00-01.jw70k.mongodb.net:27017,cluster0-shard-00-02.jw70k.mongodb.net:27017/usersDatabase?ssl=true&replicaSet=atlas-fh4503-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
   
    const db = client.db('usersDatabase').collection('postschemas')
 
    return db
}




module.exports = router