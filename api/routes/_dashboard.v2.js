const pool = require('../pgpool').getPool();
const path = require('path');
const fs = require('fs');

let router = require('express').Router();

function generateQuarantineJson(){

    let query = `select COVID.GET_LYR_QUARANTINE_UAT() as data`;

    pool.query(query,
        [ ],
        function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            let filepath = path.resolve(__dirname, '../geojson/uat.geojson');
            fs.closeSync(fs.openSync(filepath, 'w'));

            fs.writeFileSync(filepath, JSON.stringify(result.rows[0].data));
        }
    );
}


generateQuarantineJson();

setInterval(() => {
    generateQuarantineJson();
}, 5*60*1000);


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

module.exports = router;