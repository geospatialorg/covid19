const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const config = require('./config');
const port = process.env.PORT || config.app.port;

const router = express.Router();

let app =  express();

app
    .use(bodyParser.urlencoded({ extended: true }))
    .use(bodyParser.json({ limit: '10mb' }))
    .use(morgan('dev'))
    .use(express.static(path.join(__dirname, 'public')))
    .use(cors());

app.use(router);

let routerLogic = require('./routes')(app);

app.use('/', (req, res) => {
    res.sendFile('./public/index.html', { 'root': __dirname });
});

const server = require('http').createServer(app);

server.listen(port, () =>{
    console.log(`Server listening on port ${port}`);
});