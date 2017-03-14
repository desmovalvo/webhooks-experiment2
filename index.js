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

// init the sensors object
var sensors = new Object();

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


// GET :id
app.get('/subscriptions/:id', function(req, res) {

    // get the subid
    subid = req.params.id;
    
    // debug print
    console.log("Invoked GET on /subscriptions/" + subid);

    // return
    if (subscriptions.hasOwnProperty(subid)){
	res.json({"postUrl": subscriptions[subid], "success":true});
    } else {
	res.json({"success":false});
    }

})


// POST
app.post('/subscriptions', jsonParser, function(req, res) {

    // debug print
    console.log("Invoked POST on /subscriptions");

    // generate an UUID
    subid = uuidGenerator.v4().toString();

    // check if the subid is free
    if (!subscriptions.hasOwnProperty(subid)){

	// store the subscription
	subscriptions[subid] = req.body["postUrl"];

	// return
	res.json({"subscription_id":subid, "success":true});

    } else {
	
	// return
	res.json({"success":false});

    }
})

// PUT
app.put('/subscriptions/:id', jsonParser, function(req, res){

    // get the subid
    subid = req.params.id;

    // debug print
    console.log("Invoked PUT on /subscriptions/" + subid);

    // check if it exists
    if (subscriptions.hasOwnProperty(subid)){

	// store the new postUrl
	subscriptions[subid] = req.body["postUrl"];	

	// return
	res.json({"success":true});
	
    } else {
	
	// return
	res.json({"success":false});

    }

})


// DELETE
app.delete('/subscriptions', function(req, res){

    // debug print
    console.log("Invoked DELETE on /subscriptions");

    // delete the subscriptions
    for (k in subscriptions){
	if (subscriptions.hasOwnProperty(k)){
	    delete subscriptions[k];
	}
    }
    res.json({"success":true});

})

// DELETE
app.delete('/subscriptions/:id', function(req, res){

    // get the subid
    subid = req.params.id;

    // debug print
    console.log("Invoked DELETE on /subscriptions/" + subid);

    // delete the subscription
    if (subscriptions.hasOwnProperty(subid)){

	// delete the subscription
	delete subscriptions[subid];

	// return
	res.json({"success":true});
    } else {

	// return
	res.json({"success":false});
	
    }

})


///////////////////////////////////////////// 
//
// Listen!
//
///////////////////////////////////////////// 
 
console.log("Listening on port 3000!")
app.listen(3000)
