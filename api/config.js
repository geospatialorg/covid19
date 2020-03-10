module.exports = {
    auth: {
        jwtTokenSecret: 'z9zSBtYjgPHiwBr3yqnbLry2AmC7BBgWyq2PPEqP',
         tokenExpireTime: '2h'
        //tokenExpireTime: 60
    },
    app: {
        port: '6200',
        apiPath: '/api'
    },
    db: {
        user: 'postgres',
        password: 'postgres',
        host: '192.168.3.25',
        database: 'ro_covid19', 
        port: 5434
    }
};