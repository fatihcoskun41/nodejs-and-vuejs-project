"use strict";

var mongoose = require('mongoose');

var Post = require('./models/post');

mongoose.connect('mongodb://admin:N35m0i7jlL5Sucph@cluster0-shard-00-00.jw70k.mongodb.net:27017,cluster0-shard-00-01.jw70k.mongodb.net:27017,cluster0-shard-00-02.jw70k.mongodb.net:27017/usersDatabase?ssl=true&replicaSet=atlas-fh4503-shard-0&authSource=admin&retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
/* Post.create({
   _id:3,
   id:321312,
   user_id:3214512,
   IP:parseInt('127.0.0.1'),
   name:"Ali"

},(err,post)=>{
   console.log(err,post)
  
   }
)  */

Post.find({}, function (error, post) {
  if (!error) {
    console.log("başarılı bir şekilde bulundu" + post);
  } else {
    throw error;
  }
});