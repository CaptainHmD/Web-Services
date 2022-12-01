//TODO: login 
// const usersDB = {
//     users: require('../model/users.json'),
//     setUsers: function (data) {
//         this.users = data
//     }
// }
const User = require('../model/User')
 // on client clear the access token
// //! requirement
// const fsPromises = require('fs').promises // for removing the refreshToken
// const path = require('path')


//! end

const handleLogout = async (req, res) => {
    //! for full-stack  on client , also delete the accessToken
    const cookies = req.cookies;
    console.log(req);
    if (!cookies?.jwt) { return res.sendStatus(204) }  // successful but no content 

    console.log('JWT\n\n', cookies.jwt);
    // find the user that sent in from refreshToken

    const refreshToken = cookies.jwt;
    //! is refreshToken in DB?

    const foundUser = await User.findOne({refreshToken}).exec();

    // if we don`t have a user but we have cookie
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true })
        return res.sendStatus(204); // successful but no content
    }

    //! Delete the refreshToken in the DB
    // const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken)
    // const currentUser = { ...foundUser, refreshToken: "" } // erase
    // usersDB.setUsers([...otherUsers, currentUser]);

    // //! set users in DB
    // await fsPromises.writeFile(
    //     path.join(__dirname, '..', 'model', 'users.json'),
    //     JSON.stringify(usersDB.users)
    // )
    foundUser.refreshToken = ''
    const result = await foundUser.save();
    console.log('result: ', result);

    //clear cookie
    res.clearCookie('jwt', { httpOnly: true }); // optional --> secure: true means only serves om https
    res.sendStatus(204);






}

module.exports = { handleLogout };