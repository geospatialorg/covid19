const pool = require('../pgpool').getPool();

let router = require('express').Router();
const cors = require('cors');

router
    .route('/getCaseRelations')
    .get(cors(), (req, res) => {
        let params_no = 0;
        let qp = Array.from(Array(params_no).keys(), x => `$${x+1}`).join(',');
        let query = `select COVID.GET_CASES_RELATIONS_REPORT(${qp}) as data`;

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
 