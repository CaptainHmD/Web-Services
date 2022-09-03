const express = require('express');
const route = express.Router();
const users=[]
const path = require('path')
const root = path.join(__dirname,'../')

route.get('/',(req,res)=>{
    res.send(users)
})
route.get('/allusers',(req,res)=>{
    console.log('test');

    res.sendFile(path.join('public','views','index.html'), { root: root })
})
route.post('/allusers',(req,res)=>{
    users.push({name:req.body.name,num:users.length})
    res.redirect('/users/allusers');
})


module.exports = route;