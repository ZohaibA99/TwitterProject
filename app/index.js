const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const port = 3000;

// let tweets = []; -- an array that would have held tweets
//using mysql database twitter instead. (look at db.js)


app.get(
    '/tweets',
    (req, res) => {res.send(JSON.stringify(tweets));}
);

app.post(
    '/tweets',
    (req, res) => {
        const tweet = req.body.text;
        console.log(tweet);
        tweets.push(tweet);
        res.send(`posted tweet: ${tweet}`);
    }
);

app.put(
    '/tweets',
    (req, res) => {
        res.send('put hello world')
    }
);

app.delete(
    '/tweets',
    (req, res) => {
        res.send('delete hello world')
    }
);

app.listen(
    port,
    () => console.log(`example app listeingin on localhost: ${port}`)
);

