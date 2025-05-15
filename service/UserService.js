const User = require('./../models/User');
const bcrypt = require('bcrypt');

async function register(username, password) {
    let salt = await bcrypt.genSalt(12);
    let hashPassword = await bcrypt.hash(password, salt);
    let newUser = new User({
        username : username,
        password : hashPassword
    })
    return newUser.save();
}

async function login(username, password) {
    let existingUser = await User.findOne({ username : username});
    if(existingUser) {
        let isValid = await bcrypt.compare(password, existingUser.password);
        if(isValid) {
            return existingUser;
        }else {
            throw new Error('Invalid username or password');
        }
    }else {
        throw new Error('Invalid username or password');
    }
}

module.exports = {
    register,
    login
}
