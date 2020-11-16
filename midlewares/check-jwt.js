const jwt = require('jsonwebtoken');
const config= require("../config");

module.exports = function(req, res, next){
    let token= req.headers["authorization"];

    if (token) {
        jwt.verify(token, config.secret, function(err, decoded){
            if (err) {
                res.status(404).json({
                    success: false,
                    message: 'failed to authenticate token'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(404).json({
            success: false,
            message:'no token provided'
        });
    }
}