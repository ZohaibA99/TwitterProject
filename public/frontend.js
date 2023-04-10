//code for basic DOM Manipulation

//get tweets from database and make respective elements for them in the front end
//will also add a delete and edit button for each data-row that is retrieved from the database
//the delete button -> will send a DELETE request to our api

//the edit button will render a form with two input fields and a submit button
const getTweets = () =>{
    fetch('/tweets')
        .then(response => response.json())
        .then(tweets => {
            console.log(tweets);
            const tweetsDiv = document.getElementById('tweets');
            tweetsDiv.innerHTML = '';
            tweets.forEach(tweet => {
                const tweetDiv = document.createElement('div');
                tweetDiv.innerHTML = tweet.tweet_id + " " +tweet.tweet;
                tweetDiv.setAttribute("id", tweet.tweet_id);
                tweetsDiv.appendChild(tweetDiv);

                const tweetDeleteBttn = document.createElement('button');
                tweetDeleteBttn.setAttribute('class', 'tweet-delete-bttn');
                tweetDeleteBttn.setAttribute('id', tweet.tweet_id);
                tweetDeleteBttn.innerHTML = "Delete";
                tweetDeleteBttn.onclick = '';
                tweetDeleteBttn.addEventListener('click', event => {
                    event.preventDefault();
                    //console.log('delete tweet ' + tweetDeleteBttn.getAttribute('id'));
                    const tweetId = tweetDeleteBttn.getAttribute('id');
                    fetch('/tweets', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify({id: tweetId})
                    })
                    .then(response => response.json())
                    .then((data => {
                        console.log(data);
                        getTweets();
                    }))
                });
                tweetDiv.append(tweetDeleteBttn);

                const tweetEdit = document.createElement('button');
                tweetEdit.setAttribute('class', 'tweet-edit-button');
                tweetEdit.setAttribute('id', tweet.tweet_id);
                tweetEdit.innerHTML = 'Edit';
                tweetEdit.onclick = ' ';
                tweetEdit.addEventListener('click', event => {
                    event.preventDefault();
                    const elementVis = document.getElementById('tweet-edit-form');
                    elementVis.setAttribute('style', 'visibility: visible');
                })
                tweetDiv.append(tweetEdit);
            });
        });
}

//gets tweets form the database
getTweets();

//code for tweet-form
//input a tweet and click submit button
//on submit the tweet will be added to the database
//the new tweet will also be rendered to the screen
const tweetForm = document.getElementById('tweet-form');
tweetForm.addEventListener('submit', event => {
    event.preventDefault();
    const text = document.getElementById('tweet').value;
    fetch('/tweets', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: text})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        getTweets();
    });
});


//current edit form 
//same idea as tweet-form (above)
//but with a PUT request and an extra input to track
//first input -> tweet_id
//second input -> new tweet text you want to edit the tweet too
//submit -> will cause that tweet to be edited/updated PUT request
const tweetEditForm = document.getElementById('tweet-edit-form');
tweetEditForm.addEventListener('submit', event => {
    event.preventDefault();
    const text = document.getElementById('tweet-edit-tweet').value;
    const tweetId = document.getElementById("tweet-edit-tweetNumber").value;

    fetch('/tweets', {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: text, id: tweetId})
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data);
        getTweets();
    });
});