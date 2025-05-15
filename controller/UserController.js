const userService = require('./../service/UserService');
const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('./../config/secretKey');

async function register(req, res, next) {
    let { username, password } = req.body;

    try {
        let user = await userService.register(username, password);
        let payload = { id : user._id, username : username };
        let token = jwt.sign(payload, TOKEN_KEY);
        res.status(201).json({
            message : 'Success',
            data : token
        })
    }catch (err) {
        res.status(500).json({
            message : 'Fail',
            error : err.toString()
        })
    }
}

async function login(req, res, next) {

    let { username, password } = req.body;
    try {
        let user = await userService.login(username, password);
        let payload = { id : user._id , username : username };
        let token = jwt.sign(payload, TOKEN_KEY);
        res.json({
            message : 'Success',
            token
        })
    }catch (err) {
        res.status(401).json({
            message : 'Fail',
            error : err.toString()
        })
    }
}

module.exports = {
    register,
    login
}