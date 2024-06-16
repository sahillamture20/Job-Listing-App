const jwt = require('jsonwebtoken');

const verifyToekn = (req, res, next) => {
    try {
        const token = req.header('Authorization').split(' ')[1];
        if(!token) return res.status(401).json({message: 'Token not found.'});
        const decodedToken = jwt.verify(token,'secret');
        req.user = decodedToken;
        console.log(decodedToken);
        next();
    } catch (error) {
        res.status(401).json({message: 'Error verifying token'});
    }
};

module.exports = verifyToekn;