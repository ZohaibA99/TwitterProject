const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'twitter',
    user: 'root',
    password: ''
});

connection.connect(
    (err) => {
        if (err){
            console.log(err.message);
            return;
        }
        console.log('Connection Established');
    }
);

