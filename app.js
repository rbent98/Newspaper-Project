
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
app.use( express.static("public"));
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
        console.log('not connected to DB');
    } else {
        console.log('mysql DB connected');
    }
    // start writing SQL commands
    
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

app.get('/signup', (req, res) => {
    res.render('createAccount');
 });
 
 app.post('/signup', (req, res) => {
    if(!req.body.user || !req.body.password){
       res.status("400");
       res.send("Invalid details!");
    } else {
        console.log("signing up\n");
    	if(req.body.title) {
    		console.log("admin user\n");
            var admin_id;
    		connection.query('select user_id from users order by user_id desc limit 1', function (err, rows, fields) {
    			//console.log('max user id' + rows[0].user_id);
    			if(err) console.log(err);
        		if(rows.length != 0) {
        		//console.log(rows);
        			admin_id = rows[0].user_id+1;
        			//console.log('new userid:'+admin_id+'\n');
        		} else {
        			admin_id = 1;
        			console.log('first new '+admin_id+'\n');
        		}
        		connection.query('INSERT INTO newspapers (newspaper_id, newspaper_password, admin_id) VALUES (\'0\', \''+req.body.newspaper_password+'\', \''+ (admin_id) + '\');', function (err, rows, fields) {
        			if(err) console.log(err);
            		connection.query('select newspaper_id from newspapers order by newspaper_id desc limit 1', function (err, rows, fields) {
            			//console.log('max newspaper id' + rows[0].newspaper_id);
            			if(err) console.log(err);
                		if(rows.length != 0) {
                			newspaper_id = rows[0].newspaper_id;
                			//console.log('\ntest11 newspaperid: '+newspaper_id);
                		} else {
                			newspaper_id = 1;
                			//console.log('\ntest22 newspaper id: '+newspaper_id);
                		}
            			connection.query('INSERT INTO users (user_id, username, password, is_admin, newspaper_id) VALUES (\'0\', \''+req.body.user+'\', \''+req.body.password+'\', \'1\', \''+newspaper_id+'\');', function (err, rows, fields) {
                            if(err) console.log(err);
                            console.log('break');
                            req.session.user = req.body.user;
                            req.session.newspaper= rows[0].newspaper_id;
                            req.session.admin = true;
                            res.redirect('/adminTemplate1/:'+ req.session.newspaper);
                        });
                        
            
            		});
        		});
        		
            });
            
    	} else {
    		//joining existing newspaper
    		var newspaper_id;
    		connection.query('select * from newspapers where newspaper_password = \''+req.body.newspaper_password+'\';', function (err, rows, fields) {
    			if(err) console.log(err);
    			if(rows.length != 0) {
        			newspaper_id = rows[0].newspaper_id;
        			//console.log('test11'+newspaper_id);
        			connection.query('INSERT INTO users (user_id, username, password, is_admin, newspaper_id) VALUES (\'0\', \''+req.body.user+'\', \''+req.body.password+'\', \'0\', \''+newspaper_id+'\');', function (err, rows, fields) {
            			if(err){
                			console.log(err);
                		}
            		});
        		} else {
        			// TODO: richard
        			// invalid newspaper password
        			// prompt user
        		}
            });
            
            req.session.user = req.body.user;
            req.session.newspaper= newspaper_id;
            req.session.admin = true;
            res.redirect('/adminTemplate1/:'+newspaper_id);
    	}
    }
 });

app.get('/adminTemplate1/:id', function(req, res){
    connection.query('SELECT * FROM articles WHERE newspaper_id = '+req.params.id.substr(1)+ ';', (err, rows, fields)=> {
        if(err)
        console.log(err);
        if (req.session.admin){
            console.log("yup");
            res.render('adminTemplate1', {articles: rows});
        }
        else
        res.render('template1', {articles: rows});
    })
})

 app.get('/login', function(req, res){
	 if(req.session.user) {
		 res.redirect('/admintemplate1/:'+req.session.newspaper);
	 } else {
		 res.render('login');
	 }
 });

 app.get('/logout', checkSignIn,function(req, res){
	    req.session.destroy(function(){
	       console.log("user logged out.")
	    });
	    res.redirect('/login');
	 });
 
 app.post('/login', function(req, res){
    if(!req.body.user || !req.body.password) {
    	res.status("400");
       res.send("Invalid details!");
    } else {
    	connection.query('SELECT * FROM users WHERE username = \''+req.body.user+'\';', function (err, rows, fields) {
    		if(err)
    			console.log(err);
    	    else if(rows[0].password === req.body.password){
                console.log(req.session);
                req.session.user = req.body.user;
                req.session.newspaper= rows[0].newspaper_id;
                req.session.admin = true;
	            connection.query('SELECT * FROM articles WHERE newspaper_id = \'' + req.session.newspaper + '\';', function (err, rows, fields) {
	    	        if(err)
                        console.log(err);                             
                    else 
                    res.redirect('/adminTemplate1/:'+req.session.newspaper);
	            });
	        } else {
	        	res.render('login', {message: "Invalid credentials!"});
	        }
       });
       
    }
 });
 
//add checksignin
 app.get('/createarticle',checkSignIn, (req,res) =>{
	    res.render('createArticle');
});

// add artical to DB 
app.post('/createarticle', function(req, res) {
    console.log("break");
	// req.body.newspaper_id is not part of the req yet
	// It currently always stores newspaper_id of 0 in the db
	// This needs to be solved with cookies/login session
    connection.query('INSERT INTO articles (article_id, newspaper_id, title_text, title_font, title_font_size, title_alignment, body_text, body_font, body_font_size, body_alignment) VALUES (\'0\', \''+req.session.newspaper+'\', \''+req.body.titleText+'\', \''+req.body.titleTextFont+'\', \''+req.body.titleTextFontSize+'\', \''+req.body.titleTextAlignment+'\', \''+req.body.bodyText+'\', \''+req.body.bodyTextFont+'\', \''+req.body.bodyTextFontSize+'\', \''+req.body.bodyTextAlignment+'\');', function (err, rows, fields) {
        if(err) console.log(err);
        console.log("break");
        res.redirect('/adminTemplate1/:'+req.session.newspaper);
      });
});

// delete db
app.delete('/delete', function(req, res) {
	// req.body.article_id is not part of the req yet
	// It currently always deletes article_id of 0 in the db
	// This needs to be solved with cookies/login session
	
	connection.query('DELETE FROM articles WHERE articles.article_id = '+req.body.article_id+';', function (err, rows, fields) {
    	if(err) console.log(err);

      });
});
// routes

app.get('/',(req,res) => {
    res.render('login');
})


app.listen(8080);