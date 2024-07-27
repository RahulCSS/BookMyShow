const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.jwtCode);
        req.body.userId = decodedToken.userId;
    }catch{
        res.status(401).send({
            success: false,
            message: 'Invalid Token'
        });
    }
    next();
};