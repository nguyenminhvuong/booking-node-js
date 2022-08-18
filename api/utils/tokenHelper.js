const jwt = require('jsonwebtoken');
const errorHelper = require('../utils/errorHelper');

exports.verifyToken = function(req, res, next) {

    const token = req.cookies.access_token;

    if(!token)
        return next(errorHelper.createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.JWT_SECRET_KEY,  (err, user) => {
        if(err)
            return next(errorHelper.createError(401, "Token is not valid!"));

        req.user = user;

        next();
    })
}

exports.verifyUser = function(req, res, next){
    exports.verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else{
            return next(errorHelper.createError(403, "You are not authorized!"));
        }
    });
}

exports.verifyAdmin = function(req, res, next){
    exports.verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        } else{
            return next(errorHelper.createError(403, "You are not authorized!"));
        }
    });
}