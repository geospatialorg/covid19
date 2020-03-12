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

        let params_no = 9;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_CASE_LIST(${qp}) as data`;

        let params = req.query,
            login_id = req.user.login_id,
            limit = params.limit || 10,
            offset = params.offset || 0,
            sort_column = params.sort_column || null,
            order_type = params.order_type || null,
            county_code = params.filter && JSON.parse(params.filter).county_code ? JSON.parse(params.filter).county_code : null,
            status = params.filter && JSON.parse(params.filter).status ? JSON.parse(params.filter).status : null,
            case_no = params.filter && JSON.parse(params.filter).case_no ? JSON.parse(params.filter).case_no : null,
            source_no = params.filter && JSON.parse(params.filter).source_no ? JSON.parse(params.filter).source_no : null;

        pool.query(query,
            [ login_id, limit, offset, sort_column, order_type, county_code, status, case_no, source_no ],
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


router
.route('/setCase')
.post(function (req, res) {
    if (!req.user) {
        res.status(403).json({
            success: false,
            message: "Not authorized"
        });
        return false;
    }

    let params_no = 17;
    let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
    let query = `select COVID.SET_CASE(${qp}) as data`;
    

    let params = req.body,
        case_id = params.case_id || null,
        case_no = params.case_no || null,
        source_no = params.source_no || null,
        diagnostic_date = params.diagnostic_date || null,
        healing_date = params.healing_date || null,
        death_date = params.death_date || null,
        gender = params.gender || null,
        age = params.age || null,
        county_code = params.county_code || null,
        siruta = params.siruta || null,
        reference = params.reference || null,
        healed_reference = params.healed_reference || null,
        symptoms_flag = params.symptoms_flag || null,
        other_info = params.other_info || null,
        country_of_infection = params.country_of_infection || null,
        volunteer = params.volunteer || null,
        login_id = req.user.login_id;


    pool.query(query,
        [ case_id, case_no, source_no, diagnostic_date, healing_date, death_date, gender, age, county_code, siruta,
            reference, healed_reference, symptoms_flag, other_info, country_of_infection, volunteer, login_id ],
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
});



router
.route('/deleteCase')
.post(function (req, res) {
    if (!req.user) {
        res.status(403).json({
            success: false,
            message: "Not authorized"
        });
        return false;
    }

    let params_no = 2;
    let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
    let query = `select COVID.DELETE_CASE(${qp}) as data`;
    

    let params = req.body,
        case_id = params.case_id || null,
        login_id = req.user.login_id;

    pool.query(query,
        [ case_id, login_id ],
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
});

router
.route('/getCountyCombo')
.get((req, res) => {
    let query = `select COVID.GET_COUNTY_COMBO() as data`;

    pool.query(query,
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
});

router
    .route('/getUatCombo')
    .get((req, res) => {
        if (!req.user) {
            res.status(403).json({
                success: false,
                message: "Not authorized"
            });
            return false;
        }

        let params_no = 2;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_UAT_COMBO(${qp}) as data`;

        let params = req.query,
            county_code = params.county_code || null,
            search_uat = params.search_uat || null;
   
        pool.query(query,
            [ county_code, search_uat ],
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
    .route('/getCaseDetails')
    .get((req, res) => {
        if (!req.user) {
            res.status(403).json({
                success: false,
                message: "Not authorized"
            });
            return false;
        }

        let params_no = 2;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_CASE_DETAILS(${qp}) as data`;

        let params = req.query,
            login_id = req.user.login_id,
            case_id = params.case_id || null;

            
        pool.query(query,
            [ login_id, case_id ],
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

module.exports = router;