const jwt = require('jsonwebtoken');
const { TOKEN_KEY } = require('./../config/secretKey');

function verifyUserToken(req, res, next) {
    let token = req.headers.authorization;

    if(!token) return res.status(401).json({
        message : 'Fail',
        error : 'Access Denied UnAuthorized'
    }).end();

    try {
        token = token.split(' ')[1]

        if(!token)  return res.status(401).json({
            message : "Fail",
            error : 'Invalid Token'
        }).end();

        let payload = jwt.verify(token, TOKEN_KEY); // => return payload

        if (!payload) return res.status(401).json({
            message : "Fail",
            error : 'Invalid Token'
        }).end();

        req.user = payload;
        next();

    } catch (err) {
        res.status(401).json({
            message : "Fail",
            error : 'Invalid Token'
        }).end();
    }

}

module.exports = {
    verifyUserToken
}