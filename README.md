# liri-node-app

What the project does: This code contains has 4 functions(commands) which takes in user inputted values and is run through terminal.

These four commands are:
concert-this
spotify-this-song
movie-this
do-what-it-says

If "concert-this" command is followed by a blank search query the program will default to "pink" as a search item.
"Concert-this" will return the following data points:
Name of the Venue
Venue Location
Date of the Event in ("MM/DD/YYYY") format

If "spotify-this-song" command is followed by a blank search query, the program will default to "Ace of Base The Sign" as a search item.
"Spotify-this-song" will return the following data points:
Artist
Song's Name
Preview URL Link
Album where the song is from

If "movie-this" command is followed by a blank search query, the program will default to "Mr. Nobody" as a search item.
"Movie-this" will return the following data points:
Title of the Movie
Year the Movie Release
IMDB Rating
Rotten Tomatoes Rating
Country of Origin
Language
Plot
Actors/Actresses


Please view the attached screenshots as a reference:
concert-this_01.PNG (user inputted the search term "cher")
concert-this_02.PNG (user did not provide a search term, therefore the program defaulted to "pink")
spotify-this-song_01.PNG (user inputted the search term "beat it")
spotify-this-song_02.PNG (user did not provide a search term, therefore the program defaulted to "Ace of Base The Sign")
movie-this_01.PNG (user inputted the search term "inception")
movie-this_02.PNH (user did not provie a search term, therefore the program defaulted to "Mr. Nobody")
do-what-it-says_01.PNG (displays the result as a spotify-this-song for "i want it that way" by reading the random.txt file)


Why the project is useful: This project is useful as it incorporates the utilization of NPM packages along with APIs calls and ensures the data returned is in proper format to be interpretted by the user. Backend code also includes functionality if the user does not supply a valid query result.

How users can get started with the project: Users can run the program through their terminal and ensure they have installed the following NPM packages:

node-spotify-api
request
moment
dotenv

We are also using the following APIs:
OMDB
BandsInTown

Where users can get help with your project: NPM and API documentation available at the respective webpages. Attached are also screenshots of how the results should display when commands are inputted into the terminal.

Who maintains and contributes to the project: Brian Wong, brianhwong206 (at) gmail.com