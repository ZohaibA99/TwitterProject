//using sequelize

const Sequelize = require('sequelize');

//connection to database
const sequelize = new Sequelize (
    'twitter', //database
    'root', //username
    '', //pass
    {
        host: 'localhost',
        dialect: 'mysql'
    }

);

//creating an object that holds the same columns as our database (in this case our table tweets)
const Tweet = sequelize.define('tweet', {
    tweet_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tweet: {
        type: Sequelize.STRING,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

//async operation that will run our sequlized code and create 
//the desired table tweets for our application
(
    async() => {
        await sequelize.sync({force: false});
        //await Tweet.create({user_id: 1, tweet: "Hello sequelize"});
        const tweets = await Tweet.findAll();
        console.log(tweets.map(tweet => tweet.toJSON()));
    }
)();

module.exports = Tweet;