const express = require('express');
const route = express.Router();
const users=[]
route.get('/',(req,res)=>{
    res.send(users)
})
route.get('/allusers',(req,res)=>{
    res.send(users)
})
route.post('/',(req,res)=>{
    users.push({name:req.body.name,num:users.length})
    res.redirect(200,'/allusers');
})


module.exports = route;