const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', function(req, res){



    const url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1';

    https.get(url, function(response){
        response.on('data', function(data){

            const movieData = JSON.parse(data);

            const movieArr = movieData.results;

            res.render('index', {movies: movieArr});
        });
    });

});

app.post('/movie', function(req, res){
    const movies = req.body.newInput;

    const url = `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${movies}`;
    
    https.get(url, function(response){
        response.on('data', function(data){
            const movieData = JSON.parse(data);

            const movieArr = movieData.results;

            res.render('movie', {movies: movieArr});
        });
    });
});

app.listen(3000, function(){
    console.log('This is port 3000');
});


// `https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=${user}`