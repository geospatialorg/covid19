const pool = require('../pgpool').getPool();
let router = require('express').Router();
const fs = require('fs');
const path = require('path');

let jsonDir = path.resolve(__dirname, '../json/');
let geojsonDir = path.resolve(__dirname, '../geojson/');

function generateQuarantineJson(){

    let query = `select COVID.GET_LYR_QUARANTINE_UAT() as data`;

    pool.query(query,
        [ ],
        function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            let filepath = path.resolve(geojsonDir, 'uat.geojson');
            fs.closeSync(fs.openSync(filepath, 'w'));

            fs.writeFileSync(filepath, JSON.stringify(result.rows[0].data));
        }
    );
}

function generateMetropolitanAreasJson(){
    console.log('called')

    let query = `select COVID.GET_LYR_METROPOLITAN_ZONE() as data`;

    pool.query(query,
        [ ],
        function (err, result) {
            if (err) {
                return console.error('error running query', err);
            }

            let filepath = path.resolve(geojsonDir, 'metropolitan_zone.geojson');
            fs.closeSync(fs.openSync(filepath, 'w'));

            fs.writeFileSync(filepath, JSON.stringify(result.rows[0].data));
        }
    );
}

generateQuarantineJson();
// generateMetropolitanAreasJson();

setInterval(() => {
    generateQuarantineJson();
    // generateMetropolitanAreasJson();
}, 5*60*1000);

function getGeojson(file, res) {
    try {
        if (fs.existsSync(path.resolve(geojsonDir , file))) {
            fs.readFile(path.resolve(geojsonDir , file), 'utf8', (err, data)=> {
                if(err) console.log(err);
                res.status(200).send(data);
            });
        } else {
            res.status(200).send(null);
        }
    } catch(err) {
        console.error(err)
        
    }
}

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

router
    .route('/getGeojson')
    .get((req, res) => {
        res.header('Cache-Control', 'no-cache, no-store');

        let files = fs.readdirSync(geojsonDir);

        if(files.includes(req.query.name)){
            fs.readFile(path.resolve(geojsonDir, req.query.name), 'utf8', (err, data)=> {
                if(err) console.log(err);
    
                res.status(200).send(data);
            });
        }

        // fs.readFile(path.resolve(geojsonDir, req.query.name), 'utf8', (err, data)=> {
        //     if(err) console.log(err);

        //     res.status(200).send(data);
        // });
    });

router
    .route('/getJsonData')
    .get((req, res) => {
        let params =  req.query,
            file = params.file;
        
        try {
            if (fs.existsSync(path.resolve(jsonDir , file))) {
                fs.readFile(path.resolve(jsonDir , file), 'utf8', (err, data)=> {
                    if(err) console.log(err);
                    res.status(200).send({data: JSON.parse(data)});
                });
            } else {
                res.status(200).send(null);
            }
        } catch(err) {
            console.error(err)
            
        }
        
    });

router
    .route('/getDailyCases')
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
    
                res.status(200).send({
                    data: result.rows[0].data || null
                });
            }
        );

    });

router
    .route('/getMetropolitanAreasGeojson')
    .get((req, res) => {
        return getGeojson('metropolitan_zone.geojson', res);
    });

router
    .route('/getQuarantineGeojson')
    .get((req, res) => {
        return getGeojson('uat.geojson', res);
    });
    

module.exports = router;