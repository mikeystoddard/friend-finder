var friends = require("../data/friends.js");

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    app.post("/api/friends", function (req, res) {
        var newuserData = req.body;
        var newuserScore = newuserData.scores;
        var totalDifference;
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: Infinity
          };
        // Looping through all friends
        for (let index = 0; index < friends.length; index++) {
            var currentFriend = friends[index]
            console.log("check" + currentFriend)
            totalDifference = 0
            // Looping through scores of current friend
            for (let i = 0; i < currentFriend.scores.length; i++) {
                // test this
                var currentfriendScore = currentFriend.scores[i]
                totalDifference += Math.abs(parseInt(newuserScore) - parseInt(currentfriendScore))
                if (totalDifference <+ bestMatch.friendDifference){
                    bestMatch.name = currentFriend.name;
                    bestMatch.photo = currentFriend.photo;
                    bestMatch.friendDifference = totalDifference;
    
                }
            }
        }
        // appending data to friends.js file
        friends.push(newuserData);
        // returning the best match to the pop up 
        res.json(bestMatch);
    })
}