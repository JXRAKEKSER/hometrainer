const jwt = require('jsonwebtoken');
const {jwtSecretKey} = require('../config');
module.exports = function(req, res, next){
    if(req.method === 'PATCH'){
        next();
    }
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(403).json({message: "Пользователь не авторизован"});
        }
        const decodeData = jwt.verify(token, jwtSecretKey);
        req.data = decodeData;
        
        next();
    }catch(e){
        return res.status(403).json({message: "Пользователь не авторизован"});
    }
    
}