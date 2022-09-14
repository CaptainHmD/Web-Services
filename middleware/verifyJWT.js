const jwt = require ('jsonwebtoken');
require('dotenv').config();

const verifyJTW=(req,res,next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader) return res.sendStatus(401);
    // console.log(authHeader); // Bearer token
    // console.log(req.headers);
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.user=user.username;
        next();
    })
}
module.exports=verifyJTW;