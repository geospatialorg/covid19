const express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    pg = require('pg'),
    config = require('../config');

var pool = new pg.Pool(config.db);

router
.route('/login')
.post(function(req, res){

    let query = "select COVID.LOGIN($1, $2, $3) as data";

    let params = req.body;
    
    params.ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    if(!params.user_id || !params.password) {
        res.status(400).json({success: false, message:"Bad request"});
        return false;
    }

    console.log(params);
    pool.query(query, 
        [params.user_id, params.password, params.ip_address],
        function(err, result){
            if(err){
                res.status(400).send({
                    success: false,
                    user: null
                });

                return console.error('error running query', err);
            }

            if(result.rows[0].data.success){
                let user = result.rows[0].data;

                delete user.success;
                delete user.message;
                delete user.code;

                let token = jwt.sign(user, config.auth.jwtTokenSecret, {
                    expiresIn: config.auth.tokenExpireTime
                });

                delete user.login_id;

                user.token = token;

                res.status(200).send({
                    success: true,
                    user: user
                });
            } else {
                res.status(200).send({
                    success: false,
                    user: null,
                    message: result.rows[0].data.message,
                    code: result.rows[0].data.code
                });
            }
        }
    )
});

module.exports = router;