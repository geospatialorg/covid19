const pool = require('../pgpool').getPool();
const path = require('path');
const fs = require('fs');

const { Parser } = require('json2csv');

let router = require('express').Router();

router
    .route('/getDeadCasesByCounty')
    .get((req, res) => {

        let params_no = 0;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_COUNTY_CASE_DEAD(${qp}) as data`;


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
        let query = `select COVID.GET_COUNTY_CASE_HEALED(${qp}) as data`;


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
        let query = `select COVID.GET_COUNTY_CASE(${qp}) as data`;


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
    .route('/getNationalDailyCases')
    .get((req, res) => {

        let params_no = 0;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_NEW_DAILY_CASES(${qp}) as data`;

            
        pool.query(query,
            [  ],
            function (err, result) {
                if (err) {
                    res.status(400).send({
                        success: false
                    });
    
                    return console.error('error running query', err);
                }

                let d = result.rows[0].data || null;

                d.map(e => e.diagnostic_date = e.diagnostic_date ? e.diagnostic_date : 0 );
                
                var fields = [
                    {
                        label: 'data',
                        value: 'diagnostic_date'
                    },
                    {
                        label: 'cazuri_zi',
                        value: 'Cazuri'
                    },
                    {
                        label: 'cazuri_total',
                        value: 'Total'
                    },
                    // {
                    //     label: 'decese_zi',
                    //     value: 'Morti pe zi'
                    // },
                    // {
                    //     label: 'decese_total',
                    //     value: 'Morti'
                    // },
                    {
                        label: 'vindecati_zi',
                        value: 'Vindecati pe zi'
                    },
                    {
                        label: 'vindecati_total',
                        value: 'Vindecati'
                    }
                ];
 
                const json2csvParser = new Parser({ fields, quote: '', withBOM: true, delimiter: ',' });
                const csv = json2csvParser.parse(d.data);

                res.attachment('cazuri-pe-zi-national.csv');
                res.status(200).send(csv);
            }
        );
    });

router
    .route('/getCountiesDailyCases')
    .get((req, res) => {

        let params_no = 0;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_COUNTY_DAILY_CASE_REPORT(${qp}) as data`;

            
        pool.query(query,
            [  ],
            function (err, result) {
                if (err) {
                    res.status(400).send({
                        success: false
                    });
    
                    return console.error('error running query', err);
                }

                let d = result.rows[0].data || null;

                d.map(e => e['Data'] = e['Data'] ? e['Data'] : 0 );
                
                var fields = [
                    {
                        label: 'data',
                        value: 'Data'
                    },
                    {
                        label: 'judet',
                        value: 'county_code'
                    },
                    {
                        label: 'cazuri_zi',
                        value: 'daily_cases'
                    },
                    {
                        label: 'cazuri_total',
                        value: 'total_cases'
                    },
                    // {
                    //     label: 'decese_zi',
                    //     value: 'Morti pe zi'
                    // },
                    // {
                    //     label: 'decese_total',
                    //     value: 'Morti'
                    // }
                ];
 
                const json2csvParser = new Parser({ fields, quote: '', withBOM: true, delimiter: ',' });
                const csv = json2csvParser.parse(d.data);

                res.attachment('cazuri-pe-zi-judete.csv');
                res.status(200).send(csv);
            }
        );
    });

module.exports = router;