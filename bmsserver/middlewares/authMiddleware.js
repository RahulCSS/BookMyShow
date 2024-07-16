const jwt = require('jsonwebtoken');

module.exports = function(req,res){
    try{
        const token = req.headers.Authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.jwtCode);
        req.body.userId = decodedToken.userId;
    }catch{
        res.status(401).send({
            success: false,
            message: 'Invalid Token'
        });
    }
};