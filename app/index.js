//main code for backend/server side of application
//will be utilizing express to setup server
//will be utilizing sequlize for CRUD operations

//middleware is located in this file
//bodyparser to parse JSON

const express = require('express');
const bodyParser = require('body-parser');

// old connection working with mysql for crud implementation
// const connection = require('./db');

//sequlize file
const Tweet = require('./seq');

//initiate server app set up environment
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//server port
const port = 3306;


//CRUD methods for twitter application                  
app.get(
    '/tweets',
    (req, res) => {

        //new implementation utilizing sequilize methods
        //in order to handle CRUD Operations
        const tweets = Tweet.findAll()
            .then(tweets => {
                console.log(tweets);
                res.json(tweets);
            });


        //Old implementation utilzied mysql operations
        //No longer using SQL Queries in js code as to
        //prevent and protect application from 
        //SQL INJECTION ATTACKS

        /*connection.query('SELECT * FROM tweet ',
         (error, results, fields) => {
            if (error){
                console.log(error.message);
            } else {
                console.log('GET succedded');
                res.send(JSON.stringify(results));
            }
        }); */
    }
);

app.post(
    '/tweets',
    (req, res) => {
        const text = req.body.text;
        console.log(text);

        
        //Old implementation utilzied mysql operations
        //No longer using SQL Queries in js code as to
        //prevent and protect application from 
        //SQL INJECTION ATTACKS

        /*const tweet = {
            tweet_text: text,
            user_id: 1
        }; */

        /*connection.query('INSERT INTO tweet SET ?',
        tweet, (error, results, data) => {
            if (error){
                console.log(error.message);
                
            }else{
                console.log('Inserted into database');
            }
        }); */


        //new implementation utilizing sequilize methods
        //in order to handle CRUD Operations
        Tweet.create({user_id: 1, tweet: text});

        res.send({
            "status": "ok"
        });
    }
);
 
app.put(
    '/tweets',
    (req, res) => {
        const text = req.body.text;
        console.log(text);
        const tweetId = Number(req.body.id);
        console.log(tweetId);

        //new implementation utilizing sequilize methods
        //in order to handle CRUD Operations
        Tweet.update({tweet: text}, 
            {
                where: {
                    tweet_id: tweetId,
                }
            })


        //Old implementation utilzied mysql operations
        //No longer using SQL Queries in js code as to
        //prevent and protect application from 
        //SQL INJECTION ATTACKS

        /*connection.query('UPDATE tweet SET tweet_text = ? WHERE tweet_id = ?',
        [text, tweetId], (error, response, data) => {
            if(error){
                console.log(error.message);
            }else{
                console.log(`updated tweet: ${tweetId}`);
            }
        }) */


        res.send({
            "status" : "ok"
        });
    }
);


app.delete(
    '/tweets',
    (req, res) => {
        const tweetId = Number(req.body.id);
        
        //new implementation utilizing sequilize methods
        //in order to handle CRUD Operations
        Tweet.destroy({
            where: {
                tweet_id: tweetId,
            }
        })


        //Old implementation utilzied mysql operations
        //No longer using SQL Queries in js code as to
        //prevent and protect application from 
        //SQL INJECTION ATTACKS

        /*connection.query('DELETE FROM tweet WHERE tweet_id = ?',
        tweetId,
        (error, results, data) => {
            if (error){
                console.log(error.message);
            }else{
                console.log('deleted from db');
            }
        }) */

        res.send({
            "status" : "ok"
        });
    }
);

app.listen(
    port,
    () => console.log(`example app listeingin on localhost: ${port}`)
);

module.exports = app;