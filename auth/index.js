const jwt = require('jsonwebtoken');
const config = require('../config.js');
const error = require('../utils/error');
const secret = config.jwt.secret;

function sign(data) {
    return jwt.sign(data, secret);
}

const check = {
    own: function(req, owner) {
        const decoded = decodeHeader(req);

        // decoded id es el id en la tabla auth, el user debe enviar el id que tiene en esa tabla en owner
        if (decoded.id !== parseInt(owner)) {
            throw error('No puedes hacer esto', 401);
        }
    },
    logged: function (req) {
        const decoded = decodeHeader(req);
    }
}

function verify(token) {
    return jwt.verify(token, secret)
}

function getToken(auth) {
    // Bearer token
    if (!auth) {
        throw error('No viene token', 401);
    }
    if (auth.indexOf('Bearer ') === -1) {
        throw error('Formato inválido', 401);
    }

    let token = auth.replace('Bearer ','');
    return token;
}

function decodeHeader(req) {
    const authorization = req.headers.authorization || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;

    return decoded;
}

module.exports = {
    sign,
    check
};