const jwt = require('jsonwebtoken');
const config = require('../config.json');
const secretKey = config.server.secretKey;

const generateToken = (userId, isAdmin) => {
    const options = { expiresIn: '1h' };

    const token = jwt.sign({id: userId, isAdmin: isAdmin}, secretKey, options);
    return token;
}

const authenticate = async (req, res, next) => {
    const token = req.headers.authentorization;

    if (!token) {
        res.status(401).json({ message: 'Authorization fail (No token)' });
        return;
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.id = decoded.id;
        req.isAdmin = decoded.isAdmin;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' })
    }
}

const authenticateAdmin = async (req, res, next) => {
    if (req.id && req.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Insufficient permissions' });
    }
}

module.exports = { generateToken, authenticate, authenticateAdmin };