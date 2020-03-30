const pool = require('../pgpool').getPool();
let router = require('express').Router();
const fs = require('fs');
const path = require('path');

router
    .route('/getDeadCasesByCounty')
    .get((req, res) => {

        let params_no = 0;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_DEAD_CASE_NO_BY_COUNTY(${qp}) as data`;


        pool.query(query,
            [ ],
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
    .route('/getHealthCasesByCounty')
    .get((req, res) => {

        let params_no = 0;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_HEALED_CASE_NO_BY_COUNTY(${qp}) as data`;


        pool.query(query,
            [ ],
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
    .route('/getCasesByCounty')
    .get((req, res) => {

        let params_no = 0;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_CASE_NO_BY_COUNTY(${qp}) as data`;


        pool.query(query,
            [ ],
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
    .route('/getGlobalStat')
    .get((req, res) => {

        let params_no = 0;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_GLOBAL_STAT(${qp}) as data`;

            
        pool.query(query,
            [  ],
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
    .route('/getDailyCaseReport')
    .get((req, res) => {

        let params_no = 0;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_DAILY_CASE_REPORT(${qp}) as data`;

            
        pool.query(query,
            [  ],
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
    .route('/getPercentageByGender')
    .get((req, res) => {

        let params_no = 0;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.get_percent_by_gender(${qp}) as data`;

            
        pool.query(query,
            [  ],
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
    .route('/getCasesByAgeGroup')
    .get((req, res) => {

        let params_no = 0;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.get_cases_by_age_group(${qp}) as data`;

            
        pool.query(query,
            [  ],
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
    .route('/getGeojsonData')
    .get((req, res) => {
        fs.readFile(path.resolve(__dirname, '../counties.geojson'), 'utf8', (err, data)=> {
            if(err) console.log(err);
            res.status(200).send(data);
        });
    });

module.exports = router;