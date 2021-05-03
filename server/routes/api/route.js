const express = require('express');
const bodyParser = require('body-parser')
const mongoDB = require('mongodb');
const router = express.Router();
const redis = require('redis')
const Query = require('../../models/Query')



const redisClient = redis.createClient({
    port: 6379,
    detect_buffers:true,
    
    

})



redisClient.on('connect', function () {
    console.log('Redis client bağlandı');
});

redisClient.on('error', function (err) {
    console.log('Redis Clientda bir hata var ' + err);
});
process.on('unhandledRejection', error => {
    // Will print "unhandledRejection err is not defined"
    console.log('unhandledRejection', error.message);
});

new Promise((_, reject) => reject(new Error('woops'))).
    catch(err => {
        // Will not execute
        console.log('caught', err.message);
    });




router.get('/', async (req, res) => {
    const minId =  0
    const maxId =  18985536000
    const minDate =  0
    const maxDate =  1899231774000

    const valueResult = minId+maxId+minDate+maxDate

    

    


    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10
    const page = req.query.page ? parseInt(req.query.page) : 1
    const startindex = (page - 1) * pagination
    const endindex = page * pagination



        
     if (redisClient.connected) {
    
        redisClient.keys("Request*",async function(err2, keys2){
            if(err2)console.log(err2);

     
   
        redisClient.keys('User*', async function (err, keys) {
            if (err) console.log(err)
             let resp = 0
            keys2.forEach(element=>resp=element.slice(8))
         
            resp = parseInt(resp)
           
         
          

            if (keys.length > 0 && resp ==valueResult ) //Rediste kayıt varmı kontrolü
            {
               
                var personList = []
                for (var i = 0, len = keys.length; i < len; i++) {
                    
                    
                    redisClient.get(keys[i], function (err, user) {
                        

                       
                        personList.push(JSON.parse(user));
                        var temporaryResult = {}
                        temporaryResult.result = personList



                        if (personList.length == keys.length ) {
                            if (startindex > 0) {



                                temporaryResult.previous = {

                                    page: page - 1,
                                    pagination: pagination
                                }

                            }
                            if (endindex < temporaryResult.length) {


                                temporaryResult.next = {

                                    page: page + 1,
                                    pagination: personList.length - (page) * pagination
                                }
                            }
                            temporaryResult.total = personList.length
                            temporaryResult.page = Math.ceil(personList.length / pagination)
                            temporaryResult.result.sort(function (a, b) {
                                return a.timestamp - b.timestamp
                            })
                            temporaryResult.result = personList.slice(startindex, endindex)


                            res.status(200).send(temporaryResult)
                        }


                    })
              
                    
                }

            }
            else {
                var request = (minId+maxId+minDate+maxDate).toString()
                var requestId ="Request:"+request

                redisClient.setex(requestId,10,request,function(err,res) {})

                const posts = await (await loadPostsCollection()).find({
                    id: { $gte: minId, $lte: maxId },
                    timestamp: { $gte: minDate, $lte: maxDate }

                }).toArray()
              
                posts.forEach(item=>{
                   
                        var userId = "User:" + item.id
                       
                     
                        redisClient.get(userId, function (err, user) {
                            if (user == null) {
                              var data  = JSON.stringify(item)
                             
                            
                             
                              redisClient.setex(userId,10000, data, function (err, res) { })
                           
                               
                              


                            }
                            else {
                              
                            }

                                

                        }) //redis write end
                       
        })
        const results = {}
        if (startindex > 0) {



            results.previous = {

                page: page - 1,
                pagination: pagination
            }

        }
        if (endindex < posts.length) {


            results.next = {

                page: page + 1,
                pagination: posts.length - (page) * pagination
            }
        }

        results.total = posts.length
        results.page = Math.ceil(posts.length / pagination)
        results.result = posts.slice(startindex, endindex)



       
        res.json(results) 
       
     
     
 
   
    
           
            }
        })
    })
   
  


    } 

  /*   const allQuery =await Query.find({})
  const requestinfo=  allQuery.map(i=>i.request_info)
 



    
  
    
    await Query.create({
        request_info:[minId,maxId,minDate,maxDate],
        results:posts,
       
    },)  */



 
   else{
    const posts = await (await loadPostsCollection()).find({
        id: { $gte: minId, $lte: maxId },
        timestamp: { $gte: minDate, $lte: maxDate },

    }).sort({
        timestamp: 1,
        _id: 1,
        id: 1,
        user_id: 1,
        name: 1,
        IP: 1
    })
        .toArray()

       

        const results = {}
        if (startindex > 0) {



            results.previous = {

                page: page - 1,
                pagination: pagination
            }

        }
        if (endindex < posts.length) {


            results.next = {

                page: page + 1,
                pagination: posts.length - (page) * pagination
            }
        }

        results.total = posts.length
        results.page = Math.ceil(posts.length / pagination)
        results.result = posts.slice(startindex, endindex)



       
        res.json(results)


   }
   
    
    



})

router.get('/query', async (req, res) => {
    const minId = req.query.minId ? parseInt(req.query.minId) : 0
    const maxId = req.query.maxId ? parseInt(req.query.maxId) : 18985536000
    const minDate = req.query.minDate ? Date.parse(req.query.minDate) - 10800000 : 0
    const maxDate = req.query.maxDate ? Date.parse(req.query.maxDate) + (79199000 - 3600000) : 1899231774000

    const valueResult = minId+maxId+minDate+maxDate

    

    


    const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10
    const page = req.query.page ? parseInt(req.query.page) : 1
    const startindex = (page - 1) * pagination
    const endindex = page * pagination



        
     if (redisClient.connected) {
    
        redisClient.keys("Request*",async function(err2, keys2){
            if(err2)console.log(err2);

     
   
        redisClient.keys('User*', async function (err, keys) {
            if (err) console.log(err)
             let resp = 0
            keys2.forEach(element=>resp=element.slice(8))
         
            resp = parseInt(resp)
           
         
          

            if (keys.length > 0 && resp ==valueResult ) //Rediste kayıt varmı kontrolü
            {
               
                var personList = []
                for (var i = 0, len = keys.length; i < len; i++) {
                    
                    
                    redisClient.get(keys[i], function (err, user) {
                        

                       
                        personList.push(JSON.parse(user));
                        var temporaryResult = {}
                        temporaryResult.result = personList



                        if (personList.length == keys.length ) {
                            if (startindex > 0) {



                                temporaryResult.previous = {

                                    page: page - 1,
                                    pagination: pagination
                                }

                            }
                            if (endindex < temporaryResult.length) {


                                temporaryResult.next = {

                                    page: page + 1,
                                    pagination: personList.length - (page) * pagination
                                }
                            }
                            temporaryResult.total = personList.length
                            temporaryResult.page = Math.ceil(personList.length / pagination)
                            temporaryResult.result.sort(function (a, b) {
                                return a.timestamp - b.timestamp
                            })
                            temporaryResult.result = personList.slice(startindex, endindex)


                            res.status(200).send(temporaryResult)
                        }


                    })
              
                    
                }

            }
            else {
                var request = (minId+maxId+minDate+maxDate).toString()
                var requestId ="Request:"+request

                redisClient.setex(requestId,10,request,function(err,res) {})

                const posts = await (await loadPostsCollection()).find({
                    id: { $gte: minId, $lte: maxId },
                    timestamp: { $gte: minDate, $lte: maxDate }

                }).toArray()
              
                posts.forEach(item=>{
                   
                        var userId = "User:" + item.id
                       
                     
                        redisClient.get(userId, function (err, user) {
                            if (user == null) {
                              var data  = JSON.stringify(item)
                             
                            
                             
                              redisClient.setex(userId,10000, data, function (err, res) { })
                           
                               
                              


                            }
                            else {
                              
                            }

                                

                        }) //redis write end
                       
        })
        const results = {}
        if (startindex > 0) {



            results.previous = {

                page: page - 1,
                pagination: pagination
            }

        }
        if (endindex < posts.length) {


            results.next = {

                page: page + 1,
                pagination: posts.length - (page) * pagination
            }
        }

        results.total = posts.length
        results.page = Math.ceil(posts.length / pagination)
        results.result = posts.slice(startindex, endindex)



       
        res.json(results) 
       
     
     
 
   
    
           
            }
        })
    })
   
  


    } 

  /*   const allQuery =await Query.find({})
  const requestinfo=  allQuery.map(i=>i.request_info)
 



    
  
    
    await Query.create({
        request_info:[minId,maxId,minDate,maxDate],
        results:posts,
       
    },)  */



 
   else{
    const posts = await (await loadPostsCollection()).find({
        id: { $gte: minId, $lte: maxId },
        timestamp: { $gte: minDate, $lte: maxDate },

    }).sort({
        timestamp: 1,
        _id: 1,
        id: 1,
        user_id: 1,
        name: 1,
        IP: 1
    })
        .toArray()

       

        const results = {}
        if (startindex > 0) {



            results.previous = {

                page: page - 1,
                pagination: pagination
            }

        }
        if (endindex < posts.length) {


            results.next = {

                page: page + 1,
                pagination: posts.length - (page) * pagination
            }
        }

        results.total = posts.length
        results.page = Math.ceil(posts.length / pagination)
        results.result = posts.slice(startindex, endindex)



       
        res.json(results)


   }
   
    
    



})


router.post('/', async (req, res) => {


    const ip = req.ip.toString().replace('::ffff:', '');
    const num = parseInt((Date.now() / 100).toPrecision(11))

    let userid = num.toString().slice(2, 10)
    userid = parseInt(userid)
    const posts = await loadPostsCollection()
    


    await posts.insertOne({
        user_id: userid,
        id: num,
        name: req.body.name,
        IP: ip,
        timestamp: Date.now()

    })

    // Create an instance of model SomeModel
    /* var awesome_instance = new postSchema({ name: req.body.name });
    // Save the new model instance, passing a callback
    awesome_instance.save(function (err) {
      if (err) return err;
      const posts = loadPostsCollection()
       posts.insert({awesome_instance})
      // saved!
    });
     */

})





async function loadPostsCollection() {
    try {
        const client = await mongoDB.MongoClient.connect('mongodb://admin:N35m0i7jlL5Sucph@cluster0-shard-00-00.jw70k.mongodb.net:27017,cluster0-shard-00-01.jw70k.mongodb.net:27017,cluster0-shard-00-02.jw70k.mongodb.net:27017/usersDatabase?ssl=true&replicaSet=atlas-fh4503-shard-0&authSource=admin&retryWrites=true&w=majority',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
                
            })

        const db = client.db('usersDatabase').collection('postschemas')

        return db
    }
    catch (err) {
        console.log(err)
    }

}



module.exports = router