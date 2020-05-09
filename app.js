const express = require('express');
const private = require('./private')
const config = require('./keys');
const Twit = require('twit');

var T = new Twit(config);

const app = express();

const hour = 1000 * 60 * 60;
// Data searching

setInterval(getData, hour);

function getData() {
    
    var searchItem = {
        q : "#jobs OR #hiring OR #jobsearch OR #job OR #hr OR #recruiter OR #employment OR #career OR #humanresources OR #work OR #careers OR #nowhiring OR #staffing OR #getJob #recruitmentagency OR #jobhunt OR #talent OR #resume OR #jobseekers OR #jobopening OR #newjob OR #remote_job OR TweetMyJobs OR #recruit OR #recruiters OR #recruiterlife OR #recruiting OR remotejob OR recruitment OR recruitments OR internship",
    
        count: 500,
        result_type : "recent",
        lang : "en"
    };
    
    
    function dataReceived(err, data, response) {
        var id = data.search_metadata.max_id_str;
        retweetIt(id); // calling retweet id and passed the id of the recent tweet
    }
    
    T.get('search/tweets',searchItem, dataReceived);
    
}

// Twitting



function retweetIt(tweetId) {
    

    // Tweet

    // var tweet = {
    //     status : msg
    // }

    // T.post('statuses/update', tweet , tweeted);

    // function tweeted(err, data, response) {
    //     if(err) {
    //         console.log("Something wrong!");
    //     } else {
    //         console.log("It's Working");
    //     }
    // }

    // Retweet

    var retweetId = {
        id : tweetId
    };

    T.post('statuses/retweet/:id', retweetId, function (err, data, response) {
        if(err) {
            console.log("Something Wrong! Error: ", err);
        } else {
            console.log("It's Working!")
        }
    })
}

app.listen(3000, ()=> console.log(`Server is running on port 3000`));

