const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 3001;

// Define path for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlbars engine & views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Oz'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Oz'
    })
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP!',
        msg: 'Don\'t panic and take a towel',
        name: 'Oz'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided'
        })
    }
    const address = req.query.address;
    geocode(address, (error, data) => {
        if (error) {
            return res.send({error})
        }
        const {long, lat, location} = data;
        forecast(long, lat, (error, forcast) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forcast,
                address
            })
        })
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'no search term provided'
        })
    } else {

        console.log(req.query.search);
        res.send({
            product: []
        })
    }
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found',
        errorText: 'Please try again',
        name: 'Oz'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: 'ERROR 404',
        errorText: 'Page not found',
        name: 'Oz'
    })
});

app.listen(port, () => {
    console.log('listening to port' + port);
});