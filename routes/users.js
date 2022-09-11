const express = require('express');
const route = express.Router();
const users=[]
const path = require('path')
const root = path.join(__dirname,'../')
//! JWT
const verifyJWT =require('../middleware/verifyJWT');

route.get('/',verifyJWT,(req,res)=>{
    res.send(users)
})


route.get('/allusers',(req,res)=>{
    res.sendFile(path.join('public','views','index.html'), { root: root })

})
route.post('/allusers',(req,res)=>{
    users.push({name:req.body.name,num:users.length})

    res.redirect('/users/allusers');
})
route.get('/test',(req,res)=>{
    res.sendFile(path.join('views','test.html'), { root: root })
})

module.exports = route;
