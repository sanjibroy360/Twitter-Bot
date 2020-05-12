const express = require('express');
const config = require('./keys');
const Twit = require('twit');

var T = new Twit(config);
require("dotenv").config()

const app = express();

const time = 1000 * 10;


// var stream = T.stream('statuses/sample')

// stream.on('follow', function (tweet) {
//   console.log(tweet)
//   console.log('streaming')
// })


// Data searching

setInterval(getData, time);

function getData() {

    //Err: Rate Limit Exceed => There are two initial buckets available for GET requests: 15 calls every 15 minutes, and 180 calls every 15 minutes.

    var searchItem = {
        q: "#developerneeded OR #itjob OR #jobposting OR #rtjob OR #jobangels OR #joblisting OR #freelance OR #hotjob OR #webdesignjob OR #jobs OR #hiring OR #jobsearch OR #job OR #recruiter OR #employment OR #career OR #humanresources OR #careers OR #nowhiring OR #staffing OR #jobopening OR #newjob OR #remotejob OR TweetMyJobs OR #recruit OR #recruiters OR #recruiterlife OR #recruiting OR #remotejob OR #recruitment OR #recruitments OR #internship OR #interview OR #developerjob",

        result_type: "recent",
        lang: "en",
    };

    function dataReceived(err, data, response) {
        if (!data || err) {
            console.log(err);
            return getData();
        }
        var id = data.search_metadata.max_id_str;
        retweetIt(id); // calling retweet id and passed the id of the recent tweet

        // For specific location
        
        // console.log(data.statuses[0].user);
        // console.log(data);
        // for(let i = 0; i < data.statuses.length; i++) {
        //     if(data.statuses[i].user.location.includes("India") || data.statuses[i].user.location.includes("West Bengal")) {
        //         var id = data.search_metadata.max_id_str;
        //         console.log("Twitted");
        //         retweetIt(id); // calling retweet id and passed the id of the recent tweet

        //     }
        // }
        
    }

    T.get('search/tweets', searchItem, dataReceived);

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
        id: tweetId
    };

    T.post('statuses/retweet/:id', retweetId, function (err, data, response) {
        if (err) {
            getData();
            console.log("Something Wrong!");

        } else {
            console.log("It's Working!")
        }
    })
}

app.listen(3000, () => console.log(`Server is running on port 3000`));

