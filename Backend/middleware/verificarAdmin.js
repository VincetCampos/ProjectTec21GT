const jwt = require('jsonwebtoken')
const TOKEN_SECRET = require('../config.js')

const secretKey = TOKEN_SECRET;

const verifyAdmin = (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
      if (decoded.tipoEmpleado !== 'Administrador') { // Ajusta esto según el valor real que representa a un administrador
        return res.status(403).json({ message: 'Access denied. Admins only.' });
      }
      next();
    } catch (err) {
      console.error(err);
      res.status(401).send('Failed to authenticate token');
    }
  }

module.exports = verifyAdmin