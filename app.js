const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');

app.use((req, res, next) =>{
    let log = `${Date().toString()} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('serverlog.log', log + '\n', (error)=>{
        if(error){
            console.log(`could not write log...`);
        }
    });
    next();
});

app.use((req, res, next) =>{
    res.render('magnen.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getYear', ()=>{
    return new Date() .getFullYear();
});

hbs.registerHelper('screamer', (text)=>{
    return text.toUpperCase();
})

app.get('/', (req, res)=>{
    let date = new Date;
    res.render('home.hbs', {
        title: 'home',
        content: 'wellcome',
    });
});

app.get('/about', (req, res)=>{
    let date = new Date;
    res.render('about.hbs', {
        title: 'about',
        content: 'about this' 
    });
});

app.get('/bad', (req, res)=>{
    res.send({
        error: 'unable to fullile request...'
    });
});

app.listen(3000, ()=>{
    console.log('server start at port 3000');
});