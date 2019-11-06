var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'testdb'
});

connection.connect(function(error) {
    if(!!error) {
        console.log('Error');
    } else {
        console.log('mysql DB connected');
    }
    // start writing SQL commands
    
});

// add artical to DB
app.get('/api', function(req, res) {
    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw err

        // get article-id  req.body.postID
        // return title & body
        res.send(rows)

      })
});


app.get('/login', function(req, res) {
    connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw err

        // get article-id  req.body.postID
        // return title & body
        res.send(rows)

      })
});

// update db
app.post('/api', function(req, res) {
    

    // add to DB 
    // userId = req.id
    // articleId = req.articleID
    // title = req.title
    // body = req.body
});

// delete db
app.delete('/delete', function(req, res) {
    
    // find entry with article-id then delete
    // 
});

