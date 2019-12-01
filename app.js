
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
// app.use(session({secret: "Your secret key"}));
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
    database: 'newspaper_project_db'
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
    res.render('createAccount');
 });
 
 app.post('/signup', (req, res) => {
    if(false){
       res.status("400");
       res.send("Invalid details!");
    } else {
    	console.log(req.body);
    	if(req.body.title) {
    		// admin of new newspaper
    		var admin_id;
    		connection.query('select user_id from users order by user_id desc limit 1', function (err, rows, fields) {
    			//console.log('max user id' + rows[0].user_id);
    			if(err) console.log('SQL ERROR');
        		if(rows.length != 0) {
        			//console.log(rows);
        			admin_id = rows[0].user_id+1;
        			//console.log('test1'+admin_id);
        		} else {
        			admin_id = 1;
        			//console.log('test2'+admin_id);
        		}
        		connection.query('INSERT INTO newspapers (newspaper_id, newspaper_password, admin_id) VALUES (\'NULL\', \''+req.body.newspaper_password+'\', \''+ (admin_id) + '\');', function (err, rows, fields) {
        			if(err) console.log('SQL ERROR');
        			var newspaper_id;
            		connection.query('select newspaper_id from newspapers order by newspaper_id desc limit 1', function (err, rows, fields) {
            			//console.log('max newspaper id' + rows[0].newspaper_id);
            			if(err) console.log('SQL ERROR');
                		if(rows.length != 0) {
                			newspaper_id = rows[0].newspaper_id;
                			//console.log('test11'+newspaper_id);
                		} else {
                			newspaper_id = 1;
                			//console.log('test22'+newspaper_id);
                		}
            			connection.query('INSERT INTO users (user_id, username, password, is_admin, newspaper_id) VALUES (\'NULL\', \''+req.body.user+'\', \''+req.body.password+'\', \'1\', \''+newspaper_id+'\');', function (err, rows, fields) {
            				if(err) console.log('SQL ERROR');
                		});
            		});
        		});
        		
			});
    		
    	} else {
    		//joining existing newspaper
    		var newspaper_id;
    		connection.query('select * from newspapers where newspaper_password = \''+req.body.newspaper_password+'\';', function (err, rows, fields) {
    			if(err) console.log('SQL ERROR');
    			if(rows.length != 0) {
        			newspaper_id = rows[0].newspaper_id;
        			//console.log('test11'+newspaper_id);
        			connection.query('INSERT INTO users (user_id, username, password, is_admin, newspaper_id) VALUES (\'NULL\', \''+req.body.user+'\', \''+req.body.password+'\', \'0\', \''+newspaper_id+'\');', function (err, rows, fields) {
            			if(err){
                			console.log("sqlerrorrrr :(");
                		}
            		});
        		} else {
        			// TODO: richard
        			// invalid newspaper password
        			// prompt user
        		}
    		});
    	}
       /* - old - code -
       var newUser = {id: req.body.id, password: req.body.password};
       Users.push(newUser);
       // add new user to DB

       req.session.user = newUser;
       res.redirect('/protectedAdmin');
       */
    }
 });

function checkSignIn(req, res, next){
    if(req.session.user){
        console.log("authencated")
        console.log(req.session.user);
       next();     // If session exists, proceed to page
    } else {
       var err = new Error("Not logged in!");
       console.log(req.session.user);
       next(err);  // Error, trying to access unauthorized page!
    }
 }

app.get('/newspaper/:id', function(req, res) {
    connection.query('SELECT * FROM articles WHERE newspaper_id = \'' + req.params.id + '\';'), (err, rows, fields)=> {
        if(err) {
        console.log("invalid newspaper id");
    } else {
        res.redirect('/template1', {articles: rows});
        }
    }  
});

 app.get('/protectedAdmin', checkSignIn, (req,res) =>{
    res.render('protectedAdmin');
 } );

 app.get('/login', function(req, res){
	 if(req.session.user) {
		 // get newspaper_id
	 } else {
		 res.render('login');
	 }
 });

 app.get('/logout', function(req, res){
	    req.session.destroy(function(){
	       console.log("user logged out.")
	    });
	    res.redirect('/login');
	 });
 
 app.post('/login', function(req, res){
    if(!req.body.user || !req.body.password) {
    	
        // currently no prompt is displayed with the following render
    	//console.log("invalid user/pass entered");
    	res.render('login', {message: "Please enter both id and password"});
    } else {
    	connection.query('SELECT * FROM users WHERE username = \''+req.body.user+'\';', function (err, rows, fields) {
    		if(err) {
    			console.log("Invalid SQL querey");
    		} else if (!rows.length) {                                                   
    			//console.log("Invalid username");
    		} else if(rows[0].password === req.body.password){
    			//console.log("Succsessful Login")
	        	var newspaper_id = rows[0].newspaper_id;
	        	var is_admin = rows[0].is_admin;
	            // req.session.user = req.body.username;
	            connection.query('SELECT * FROM articles WHERE newspaper_id = \'' + newspaper_id + '\';', function (err, rows, fields) {
	    	        if(err) {
	    	            //console.log("Error retreiving articles for user...");                                
	    	        } else {
	    	        	if(!rows.length) console.log("No articles resulted from the querey");
	    	        	if (!is_admin){
	                        res.redirect('/template1', {articles: rows});
	                    } else { // if admin
	                        res.redirect('/adminTemplate1', {articles: rows});
	                    }
	    	        }
	            });
	        } else {
	        	// currently no prompt is displayed with the following render
	        	//console.log("wrong password");
	        	res.render('login', {message: "Invalid credentials!"});
	        }
       });
       
    }
 });
 
//add checksignin
 app.get('/createarticle', (req,res) =>{
	    res.render('createArticle');
});

// add artical to DB 
app.post('/createarticle', function(req, res) {
	// req.body.newspaper_id is not part of the req yet
	// It currently always stores newspaper_id of 0 in the db
	// This needs to be solved with cookies/login session
    connection.query('INSERT INTO articles (article_id, newspaper_id, title_text, title_font, title_font_size, title_alignment, body_text, body_font, body_font_size, body_alignment) VALUES (\'NULL\', \''+req.body.newspaper_id+'\', \''+req.body.titleText+'\', \''+req.body.titleTextFont+'\', \''+req.body.titleTextFontSize+'\', \''+req.body.titleTextAlignment+'\', \''+req.body.bodyText+'\', \''+req.body.bodyTextFont+'\', \''+req.body.bodyTextFontSize+'\', \''+req.body.bodyTextAlignment+'\');', function (err, rows, fields) {
    	if(err) console.log('SQL ERROR');

      });
});


// update db
// why do we have this method?
app.post('/api', function(req, res) {
    

    // add to DB
    // userId = req.id
    // articleId = req.articleID
    // title = req.title
    // body = req.body
});

// delete db
app.delete('/delete', function(req, res) {
	// req.body.article_id is not part of the req yet
	// It currently always deletes article_id of 0 in the db
	// This needs to be solved with cookies/login session
	
	connection.query('DELETE FROM`articles WHERE articles.article_id = '+req.body.article_id+';', function (err, rows, fields) {
    	if(err) console.log('SQL ERROR');

      });
});
// routes

/*
 * app.get('/', function(req, res) { res.render('index'); });
 */


app.listen(8080);