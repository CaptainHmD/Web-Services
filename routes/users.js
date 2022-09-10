const express = require('express');
const route = express.Router();
const users=[]
const path = require('path')
const root = path.join(__dirname,'../')

route.get('/',(req,res)=>{
    res.send(users)
})
route.get('/user', (req, res) => {
    res.send(user);
})
route.get('/allusers',(req,res)=>{
    console.log('test');

    res.sendFile(path.join('public','views','index.html'), { root: root })
})
route.post('/allusers',(req,res)=>{
    users.push({name:req.body.name,num:users.length})
    // console.log(req.body.firstP);
    // console.log(req.body.secondP);
    // console.log(req.body);
    res.redirect('/users/allusers');
})


module.exports = route;
