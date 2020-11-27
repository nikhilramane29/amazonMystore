const mysql = require('mysql2')

const pool =mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    port: 3306,
    database:'amazon',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool