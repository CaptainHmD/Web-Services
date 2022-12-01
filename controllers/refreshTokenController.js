//TODO: login 
// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) {
//         this.users = data
//     }
// }

const User = require('../model/User');

//! JWT requirement
const jwt = require('jsonwebtoken');
const { user } = require('../config/roles_list');
require('dotenv').config();


//! end

const handleRefreshToken = async (req, res) => {
    // console.log(req);
    const cookies = req.cookies;
    if (!cookies?.jwt) { return res.sendStatus(401) }  // if there is a cookie then if it include jwt

    // console.log('JWT\n\n', cookies.jwt);
    // find the user that sent in from refreshToken
    const refreshToken = cookies.jwt

    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); // 403 forbidden

    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, user) => {
            console.log(foundUser.roles);
            if (err || foundUser.username !== user.username) { res.sendStatus(403) };
            const roles = Object.values(foundUser.roles)  //! authorization
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": user.username,
                        "roles": roles  //! authorization
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );
            res.json({ accessToken })
        });


}

module.exports = { handleRefreshToken };