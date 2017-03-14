///////////////////////////////////////////// 
//
// requirements
//
///////////////////////////////////////////// 

var express = require('express');
var bodyParser = require('body-parser');
var uuidGenerator = require('node-uuid');
 
///////////////////////////////////////////// 
//
// initialization
//
///////////////////////////////////////////// 

// creating an express application
var app = express()

// init the subscriptions object
var subscriptions = new Object();

// configuring body parser
urlEncodedParser = bodyParser.urlencoded({ extended: true });
jsonParser = bodyParser.json();


///////////////////////////////////////////// 
//
// subscriptions routes 
//
///////////////////////////////////////////// 

// GET 
app.get('/subscriptions', function(req, res) {

    // debug print
    console.log("Invoked GET on /subscriptions");

    // return
    res.json({"subscriptions": subscriptions, "success":true});
})


// POST
app.post('/subscriptions', jsonParser, function(req, res) {

    // debug print
    console.log("Invoked POST on /subscriptions");

    // parse the body
    console.log(req.body["postUrl"]);

    // generate an UUID
    subid = uuidGenerator.v4().toString();

    // store the subscriptions
    subscriptions[subid] = req.body["postUrl"];

    // return
    res.json({"subscription_id":subid, "success":true});

})


// DELETE
app.delete('/subscriptions/:id', function(req, res){

    // debug print
    console.log("Invoked DELETE on /subscriptions/" + req.params.id);

    // delete the subscription
    delete subscriptions[req.params.id];

    // return
    res.json({"success":true});
})


///////////////////////////////////////////// 
//
// Listen!
//
///////////////////////////////////////////// 
 
console.log("Listening on port 3000!")
app.listen(3000)
