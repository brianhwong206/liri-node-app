require("dotenv").config();

//install npms
//npm install --save node-spotify-api (installed)
//npm install request (installed)
//npm install moment (installed)
//npm install dotenv (installed)

//npm requirements
var Spotify = require('node-spotify-api');
var request = require('request');
var keys = require("./keys.js") //declaration of keys, requiring, and displaying the path
var moment = require('moment');
var fs = require("fs"); // fs is a core Node package for reading and writing files
var spotify = new Spotify(keys.spotify); // declaration of variable to access spotify keys info


var allInfo = process.argv; // "node file action queryItem ==> returns array value"
var action = process.argv[2]; // action requested by the user stored into a variable, to be used by switch statement
var queryItem = ""; // item to be queried provided by the user
if (process.argv[3] !== undefined) { //checks to see if a value was inputted for the 3rd index value of the process.argv
    for (var i = 3; i < allInfo.length; i++){ // for loop to identify the length of the all data captured by process.argv
    queryItem +=  allInfo[i] + " "; // string variable is appened to the current blank queryitem variable.
    };
};

// console.log(allInfo); // prints entire string

console.log("User selected '" + action + "' action."); // prints action (2nd index item from the command line)

// liri commands
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says

//Switch statement based on user inputted Action
switch(action) {
    case "concert-this":
        concertTitleCheck()// function to search for concert info
    break;

    case "spotify-this-song":
        spotifyTitleCheck()// function to spotify this song with title check
    break;
    
    case "movie-this":
        movieTitleCheck() // function to search for movie info with title check
    break;

    case "do-what-it-says":
        doWhatItSays()// function to do what it says
    break;

    default:
};

//Spotify TitleCheck
function spotifyTitleCheck() { // check to see if user inputted a valid title to be searched
    if (process.argv[3] === undefined) { // if process.argv[3] value is returned as undefined
        queryItem = "The%20Sign%20Ace%20of%20Base"; // default search query if user does not input song title, includes the "%20" in place for space characters for spotify API syntax
        spotifySong() // run spotifySong function
    }else if (process.argv[3] !== undefined) { // if process.argv[3] value is not returned as undefined
        queryItem = process.argv[3]; // assigns queryItem as the process.argv[3]
        var newQueryItem = queryItem.split(" ");
        queryItem = newQueryItem.join("%") // replaces commas with % symbol so spotify search query can be completed
        spotifySong() // run spotifySong function
    }
}

//Spotify Call
function spotifySong() {
    spotify.search({ type: 'track', query: queryItem, limit: 1}, function(err, data) {
        if (err) { // if error
          return console.log('Error occurred: ' + err);

        } else if (data){
        //console.log (data.tracks.items); // response from API
        var spotifyInfo = data.tracks.items; // stores all the returned values from API call
        var artistName = spotifyInfo[0].artists[0].name; // stores Artist Name
        var songName = spotifyInfo[0].name; // stores Song Name
        var previewLink = spotifyInfo[0].preview_url; // stores URL preview link
        var albumName = spotifyInfo[0].album.name; // stores Album Name

        console.log("\n===== '" + action + "' results =====\n");
        console.log("Artist Name: " + artistName);
        console.log("Song Name: " + songName);
        console.log("Preview Link: " + previewLink);
        console.log("Album Name: " + albumName);
        console.log("\n===== end of action ======\n");
        };      
    });
};

// MovieTitle check
function movieTitleCheck() { // check to see if user inputted a valid title to be searched
    if (process.argv[3] === undefined) { // if process.argv[3] value is returned as undefined
        queryItem = "Mr. Nobody"; // default search query if user does not input movie title
        movieSearch(); // run movieSearch() function
    } else if (process.argv[3] !== undefined) {// if process.argv[3] value not is returned as undefined
        queryItem = process.argv[3]; // assigns queryItem as the process.argv[3]
        movieSearch(); // run movieSearch() function
    }
};

// OMDB Call
function movieSearch() {

    var omdbAPIKey = "trilogy";
    request("http://www.omdbapi.com/?t=" + queryItem + "&apikey="+omdbAPIKey, function(error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

        var movieTitle = JSON.parse(body).Title;
        var movieYearRelease = JSON.parse(body).Year;
        var imdbRating = JSON.parse(body).imdbRating;
        var rottenTomatoesRating = JSON.parse(body).Ratings[1].Value;
        var countryProduced = JSON.parse(body).Country;
        var movieLanguage = JSON.parse(body).Language;
        var moviePlot = JSON.parse(body).Plot;
        var movieActors = JSON.parse(body).Actors;

        // console.log(response);
        console.log("\n===== '" + action + "' results =====\n");
        console.log("Movie Title: " + movieTitle);
        console.log("Year of Release: " + movieYearRelease);
        console.log("IMDB Rating: " + imdbRating);
        console.log("Rotten Tomatoes Rating: " + rottenTomatoesRating);
        console.log("Country of Origin: " + countryProduced);
        console.log("Language: " + movieLanguage);
        console.log("Plot: " + moviePlot);
        console.log("Actors: " + movieActors);
        console.log("\n===== end of action ======\n");
        }
    });
};

// MovieTitle check
function concertTitleCheck() { // check to see if user inputted a valid title to be searched
    if (process.argv[3] === undefined) { // if process.argv[3] value is returned as undefined
        queryItem = "Pink"; // default search query if user does not input movie title
        concertSearch(); // run movieSearch() function
    } else if (process.argv[3] !== undefined) {// if process.argv[3] value not is returned as undefined
        queryItem = process.argv[3]; // assigns queryItem as the process.argv[3]
        var newQueryItem = queryItem.split(" "); // converts space characters into commas
        queryItem = newQueryItem.join("") // replaces commas with % symbol so spotify search query can be completed
        concertSearch(); // run movieSearch() function
    }
};

function concertSearch() {
    request("https://rest.bandsintown.com/artists/" + queryItem + "/events?app_id=codingbootcamp", function(error, response, body) {
        if (!error && response.statusCode === 200) {

            console.log("\n===== '" + action + "' results =====\n");

            var result = JSON.parse(body);

            console.log(result.length + " Returned results for " + queryItem + ".");

            for (var j = 0 ; j < result.length ; j++) {

                var time = moment(result[j].datetime).format("L");
                 
                console.log("\nResult # " + (j + 1));
                console.log("Name: " + result[j].venue.name);
                console.log("Venue Location: " + result[j].venue.city + ", " + result[j].venue.region + ", " + result[j].venue.country)
                console.log("Date: " + time);
                console.log("\n========");
                };
            console.log("\n===== end of action ======\n");
        }
    });
};

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function(err, data) { // fs to read from content from random.txt file
        if (err) {
            return console.log(err);
          }
          else 
          var outputArray = data.replace('"','').split(","); // returned data removes  double quotes with blank and splits string into array.
          action = outputArray[0]; // sets action as the 0th index itemfrom array
          queryItem = outputArray[1]; // sets queryItem as the 1st index item from array
          spotifySong(); // run spotifySong function
    });
};



