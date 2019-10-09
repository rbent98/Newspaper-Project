const fetch = require("fetch");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
// const url;

// express configs
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// routes

app.get('/', function(req, res) {
    res.render('index');
});

// fetch(url)
// .then(Response => Response.json())
// .then(data => {
//     // do something with data
// });

app.listen(8080);