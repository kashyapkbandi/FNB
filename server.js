const express = require('express');
const path = require('path');
const hbs = require('hbs');
var sf = require('node-salesforce');
const request = require('request');

var conn = new sf.Connection({
// you can change loginUrl to connect to sandbox or prerelease env.
loginUrl : 'https://login.salesforce.com'
});

var app = express();
const port = process.env.PORT || 3000;

// middleware
// __dirname - stores path to directory

app.use(express.static(__dirname + '/assets'));
const viewPath = path.join(__dirname, './templates/views');

app.use(function (req, res, next) {
res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
next();
});

console.log(viewPath);
// tell express to use templates instead of views. 

app.set('views', viewPath);


app.get('/getSFAccessToken', (req, res) => {

// Storage isnull for accessToken so get the new token. 

    conn.login('kkb@fnb.org', 'BitterButter123gBF7dnmRG3MtT9wqI7PmcGdkX', function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    // console.log('inside'+conn.accessToken);
    // console.log('inside'+conn.instanceUrl);
    
    // // logged in user property
    // console.log("User ID: " + userInfo.id);
    // console.log("Org ID: " + userInfo.organizationId);     
    res.send({accessToken : conn.accessToken ,
        instanceURL : conn.instanceURL});
    });


        



});



app.get('/', (req, res) => {
res.render('home');
});



app.set('view engine', 'hbs');




app.listen(port);