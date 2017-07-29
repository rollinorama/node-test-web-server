const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.originalUrl}`;

    console.log(log);
    fs.appendFile('server.log', `${log}\n`, err => {
        if (err)
            console.log('Unable to save on logger');
    });
    next();
})
// app.use((req, res, next) => res.render('maintenance.hbs'));
app.use(express.static(`${__dirname}/public`));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', text => text.toUpperCase());

app.get('/', (req, res) => {
    // res.send('Hello Express!');
    res.render('home.hbs', {
        pageTitle: 'Homepage',
        welcomeMessage: 'Welcome home King Diamond!!!',
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});