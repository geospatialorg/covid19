const pool = require('../pgpool').getPool();

let router = require('express').Router();

router
    .route('/getCaseList')
    .get((req, res) => {
        if (!req.user) {
            res.status(403).json({
                success: false,
                message: "Not authorized"
            });
            return false;
        }

        let params_no = 6;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_CASE_LIST(${qp}) as data`;

        let params = req.query,
            login_id = req.user.login_id,
            limit = params.limit || 10,
            offset = params.offset || 0,
            sort_column = params.sort_column || null,
            order_type = params.order_type || null,
            county_code = params.county_code || null;

            
        pool.query(query,
            [ login_id, limit, offset, sort_column, order_type, county_code ],
            function (err, result) {
                if (err) {
                    res.status(400).send({
                        success: false
                    });
    
                    return console.error('error running query', err);
                }
    
                res.status(200).send({
                    data: result.rows[0].data || null
                });
            }
        );

    });

router
    .route('/setLogout')
    .get(function (req, res) {
        console.log(req.user);
        
        if (!req.user) {
            res.status(403).json({
                success: false,
                message: "Not authorized"
            });
            return false;
        }
    
        let params_no = 1;
            let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
            let query = `select COVID.LOGOUT(${qp}) as data`;
    
        let login_id = req.user.login_id;
    
        pool.query(query,
            [ login_id ],
            function (err, result) {
                if (err) {
                    res.status(400).send({
                        success: false,
                        user_id: null
                    });
    
                    return console.error('error running query', err);
                }
    
                res.status(200).send({
                    data: result.rows[0].data || null
                });
            }
        )
    })




module.exports = router;