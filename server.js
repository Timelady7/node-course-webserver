const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((request, response, next) => {  //register middleware
    const now = new Date().toString();
    const log = `${now} : ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((request, response) => {
//     response.render('maintenance.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome on this website',
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Error handling message'
    });
});

app.listen(3000);