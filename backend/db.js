const mysql = require('mysql');

let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Connected to MySQL Database!");
    }
});

module.exports = connection;