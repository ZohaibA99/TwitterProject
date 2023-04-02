const getTweets = () =>{
    fetch('/tweets')
        .then(response => response.json())
        .then(tweets => {
            console.log(tweets);
            const tweetsDiv = document.getElementById('tweets');
            tweetsDiv.innerHTML = '';
            tweets.forEach(tweet => {
                const tweetDiv = document.createElement('div');
                tweetDiv.innerHTML = tweet.tweet_id + " " +tweet.tweet_text;
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
            });
        });
}

getTweets();

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
