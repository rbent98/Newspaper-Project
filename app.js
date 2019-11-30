
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); 
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mysql = require('mysql');
var ejs = require('ejs');

// express configs
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
//app.use(session({secret: "Your secret key"}));
app.use(session({
    secret: 'abcx',
    resave: true,
    saveUninitialized: true
}));

var Users = [];
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Newspaper_Project_DB'
});

connection.connect(function(error) {
    if(!!error) {
        console.log('Error');
    } else {
        console.log('mysql DB connected');
    }
    // start writing SQL commands
    
});

app.get('/signup', (req, res) => {
    res.render('signup');
 });
 
 app.post('/signup', (req, res) => {
    if(!req.body.id || !req.body.password){
       res.status("400");
       res.send("Invalid details!");
    } else {
       var newUser = {id: req.body.id, password: req.body.password};
       Users.push(newUser);
       // add new user to DB

       req.session.user = newUser;
       res.redirect('/protectedAdmin');
    }
 });

function checkSignIn(req, res, next){
    if(req.session.user){
        console.log("authencated")
        console.log(req.session.user);
       next();     //If session exists, proceed to page
    } else {
       var err = new Error("Not logged in!");
       console.log(req.session.user);
       next(err);  //Error, trying to access unauthorized page!
    }
 }

 app.get('/protectedAdmin', checkSignIn, (req,res) =>{
    res.render('protectedAdmin');
 } );

 app.get('/login', checkSignIn, function(req, res){
     
    res.render('login');
 });

 app.get('/logout', function(req, res){
    req.session.destroy(function(){
       console.log("user logged out.")
    });
    res.redirect('/login');
 });
 
 app.post('/login', function(req, res){
    connection.query('SELECT * FROM users WHERE username = \''+req.body.username+'\';', function (err, rows, fields) {
        if (err) throw err
            if(rows[0].password === req.body.password) {
                //sucssful login
                var newspaper_id = rows[0].newspaper_id;
                req.session.user = user;
                connection.query('SELECT * FROM articles WHERE newspaper_id = \'' + newspaper_id + '\';'), (err, rows, fields)=> {
                    if(err) throw err;
                    res.redirect('/protectedAdmin', {articles: rows});
                }           
            } else
                res.render('login', {message: "Invalid credentials!"});
        })
 });



 // add artical to DB
app.get('/createarticle', function(req, res) {
    res.render('createarticle')
});

// add artical to DB
app.post('/createarticle',checkSignIn, function(req, res) {
    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw err

        // get article-id  req.body.postID
        // return title & body
        res.send(rows)

      })
});



// delete db
app.delete('/delete', checkSignIn,function(req, res) {
    
    // find entry with article-id then delete
    // 
});

app.get('/', function(req, res) {
    res.render('index');
});


app.listen(8080)