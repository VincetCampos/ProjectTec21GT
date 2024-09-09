const jwt = require('jsonwebtoken')
const TOKEN_SECRET = require('../config.js')

function authRequiere(req, res, next){
    const { token } = req.cookies;
    
    if(!token) return res.status(401).json({message: "authorization denied"})

    
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send("Token inválido.");
            
        req.user = user;
        //console.log(user)
        next();
    });

}

module.exports = authRequiere;