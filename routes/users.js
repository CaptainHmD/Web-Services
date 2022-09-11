const express = require('express');
const route = express.Router();
const users=[]
const path = require('path')
const root = path.join(__dirname,'../')

route.get('/',(req,res)=>{
    res.send(users)
})

route.get('/user', (req, res) => {
    res.send("hello, world");
})

route.get('/allusers',(req,res)=>{
    res.sendFile(path.join('public','views','index.html'), { root: root })
})
route.post('/allusers',(req,res)=>{
    users.push({name:req.body.name,num:users.length})
    // console.log(req.body.firstP);
    // console.log(req.body.secondP);
    // console.log(req.body);
    res.redirect('/users/allusers');
})
route.get('/test',(req,res)=>{
    res.sendFile(path.join('views','test.html'), { root: root })
})

module.exports = route;
