//TODO: login 
const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users=data
    }
}


//! JWT requirement
const jwt = require ('jsonwebtoken')
require('dotenv').config();


//! end

const  handleRefreshToken = (req,res)=>{
    console.log(req);
    const cookies = req.cookies;
    console.log(req.cookies);
    if(!cookies?.jwt){return res.sendStatus(401)}  // if there is a cookie then if it include jwt

    console.log('JWT\n\n',cookies.jwt);
        // find the user that sent in from refreshToken
        const refreshToken = cookies.jwt

    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken);
    if(!foundUser)return res.sendStatus(403); // 403 forbidden
    
    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err,user)=>{
            if(err || foundUser.username !== user.username){res.sendStatus(403)};
        const accessToken = jwt.sign(
                {"username":user.username},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1h'}
            );
        res.json({accessToken})
        });
        
   
}

module.exports = { handleRefreshToken };