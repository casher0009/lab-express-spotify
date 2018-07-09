var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require('body-parser')
const path = require('path');

 app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public/'));


app.get('/', (req, res) => {
    res.render('index');
});

// app.get('/artist/:artista', (req, res) => {
//     res.render('artist');
// });

// app.get('/search', (req,res)=>{
//     res.render('artist/form')
// })

app.get('/artist', (req, res) => {
    console.log(req.query);
    spotifyApi.searchArtists(req.query.search)
        .then(data => {console.log(data.body.artists.items);
            var allResults = data.body.artists.items;
            res.render('artist', { info: allResults });
        })
        .catch(err => console.log(err)
        )
});

    
    

// app.get('/album', (req, res) => {
//     res.render('album');
// });

// app.get('/tracks', (req, res) => {
//     res.render('tracks');
// });

// Remember to paste here your credentials
var clientId = '2ac7352aec414da58d36c64591f7899e',
    clientSecret = '92c6f26466ce4fdfb35ef956da7fe7f6';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});


app.listen(3000, () => {
  console.log("Welcome to SpotifyMatrix");
});
    