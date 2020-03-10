const config = require('../config');
const jwt = require('jsonwebtoken');

function verifyToken (req, res, next){
    var token = req.headers.authorization.split(' ')[1] || null;

    if(token) {
        jwt.verify(token, config.auth.jwtTokenSecret, function(err, decoded){
            if(err){
                console.log(err);
                
                if(err.name === 'TokenExpiredError'){
                    return res.status(401).json({
                        success: false,
                        message: 'TokenExpiredError'
                    });
                }

                return res.status(401).json({
                    success: false,
                    message: 'Failed to authenticate token.'
                });
                
            } else {
                req.user = decoded;

                var now = new Date();
                var nowSeconds = parseInt(now.getTime()/1000);

                var newToken = null;
                var tokenTtl = decoded.exp - nowSeconds;

                if(tokenTtl < 600 && tokenTtl > 0) {
                    let user = Object.assign({}, decoded);
                    delete user.token;
                    delete user.iat;
                    delete user.exp;

                    newToken = jwt.sign(user, config.auth.jwtTokenSecret, {
                        expiresIn: config.auth.tokenExpireTime
                    });

                    res.append('New-Access-Token', newToken);
                }

                next();
            }
        });
    } else {
        return res.status(403).json({
            success: false,
            message: 'No token provided.'
        });
    }
}

module.exports = app => {
    app.use(`${config.app.apiPath}/authentication`, require('./_authentication'));
    app.use(`${config.app.apiPath}/dashboard`, require('./_dashboard'));
    app.use(`${config.app.apiPath}/*`,verifyToken);
    app.use(`${config.app.apiPath}/administration`, require('./_administration'));
}