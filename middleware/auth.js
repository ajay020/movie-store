const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next){
    //check if token is provided in rea header
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denied! No token provided');

    try {
        //verify token
        const decoded = jwt.verify(token, config.get('jwtPrivatKey'));// it return payload.
        req.user = decoded; 
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

module.exports = auth ;