//code for connecting mysql database to project.
//No longer needed since I am using Sequelize in order to do database stuff
//Look at: seq.js file for sequalized implementation of database

const mysql = require('mysql');

//information for connection to databsae
const connection = mysql.createConnection({
    host: 'localhost',
    database: 'twitter',
    user: 'root',
    password: ''
});


//connect to database
connection.connect(
    (err) => {
        if (err){
            console.log(err.message);
            return;
        }
        console.log('Connection Established');
    }
);

module.exports = connection;

