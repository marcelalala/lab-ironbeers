const express = require('express');
const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// add the partials here:
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// add the routes here:
app.get('/', (req, res) => res.render('index'));

app.get('/beers', (req, res) => {
    punkAPI.getBeers()
    .then(beers => {
        res.render('beers', {beers})
        console.log({beers})
    })
    .catch(error => console.log(error));
})

app.get('/random-beers', (req, res) => {
    punkAPI.getRandom()
    .then(randomBeers => {
        res.render('random-beers', {randomBeers})
        console.log({randomBeers})
    })
    .catch(error => console.log(error));
})



app.listen(3000, () => console.log('🏃‍ on port 3000'));
