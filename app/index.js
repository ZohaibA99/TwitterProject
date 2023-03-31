const express = require('express');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

const port = 3000;

let tweets = []; //-- an array that would have held tweets
//using mysql database twitter instead. (look at db.js)

 

//CRUD methods for twitter application                  
app.get(
    '/tweets',
    (req, res) => {//res.send(JSON.stringify(tweets));
         connection.query('SELECT * FROM tweet ',
         (error, results, fields) => {
            if (error){
                console.log(error.message);
            } else {
                console.log('GET succedded');
                res.send(JSON.stringify(results));
            }
        });
    }
);

app.post(
    '/tweets',
    (req, res) => {
        const text = req.body.text;
        console.log(text);
        //tweets.push(text);  //pushes data to tweets array
        
        const tweet = {
            tweet_text: text,
            user_id: 1
        };

        connection.query('INSERT INTO tweet SET ?',
                        tweet, (error, results, fields) => {
                            if (error){
                                console.log(error.message);
                                
                            }else{
                                console.log('Inserted into database');
                            }
                        });

        res.send(`posted tweet: ${text}`);
    }
);
 
app.put(
    '/tweets',
    (req, res) => {
        res.send('put hello world')
    }
);


app.delete(
    '/tweets/:id',
    (req, res) => {
        const tweetId = Number(req.params.id);
        connection.query('DELETE FROM tweet WHERE tweet_id = ?',
        tweetId,
        (error, results, data) => {
            if (error){
                console.log(error.message);
            }else{
                console.log('deleted from db');
            }
        })
        res.send(`Deleted tweet: ${tweetId}`);
    }
);

app.listen(
    port,
    () => console.log(`example app listeingin on localhost: ${port}`)
);

