const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJTW = (req, res, next) => {
    // const authHeader = req.headers['authorization']; //! it will be updated (old)
    console.log('test');
    const authHeader = req.headers.authorization || req.headers.Authorization; //! (new) For a letter can be capital || Small
    console.log('headarsssssssssssssss : ', authHeader);

    if (!authHeader) return res.sendStatus(401); //! space is very important after Bearer
    // console.log(authHeader); // Bearer token
    // console.log(req.headers);
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user.UserInfo.username;
        req.roles = user.UserInfo.roles;
        next();
    })
}
module.exports = verifyJTW;