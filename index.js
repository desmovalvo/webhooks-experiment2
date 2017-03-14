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

// init the earthquakes object
var earthquakes = new Object();

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
// earthquakes routes 
//
///////////////////////////////////////////// 

// GET 
app.get('/earthquakes', function(req, res) {

    // debug print
    console.log("Invoked GET on /earthquakes");

    // return
    res.json({"earthquakes": earthquakes, "success":true});
})


// GET :id
app.get('/earthquakes/:id', function(req, res) {

    // get the subid
    eid = req.params.id;
    
    // debug print
    console.log("Invoked GET on /earthquakes/" + eid);

    // return
    if (earthquakes.hasOwnProperty(eid)){
	res.json({"earthquake": earthquakes[eid], "success":true});
    } else {
	res.json({"success":false});
    }

})


// POST
app.post('/earthquakes', jsonParser, function(req, res) {

    // debug print
    console.log("Invoked POST on /earthquakes");

    // generate an UUID
    eid = uuidGenerator.v4().toString();

    // check if the eid is free
    if (!earthquakes.hasOwnProperty(eid)){

	// store the earthquake
	earthquakes[eid] = new Object();
	earthquakes[eid]["timestamp"] = new Date().getTime().toString();
	earthquakes[eid]["latitude"] = req.body["latitude"];
	earthquakes[eid]["longitude"] = req.body["longitude"];
	earthquakes[eid]["depth"] = req.body["depth"];
	earthquakes[eid]["intensity"] = req.body["intensity"];

	// return
	res.json({"earthquake_id":eid, "success":true});

    } else {
	
	// return
	res.json({"success":false});

    }
})


// PUT
app.put('/earthquakes/:id', jsonParser, function(req, res){

    // get the subid
    eid = req.params.id;

    // debug print
    console.log("Invoked PUT on /earthquakes/" + eid);

    // check if it exists
    if (earthquakes.hasOwnProperty(eid)){

	// store the new data
	earthquakes[eid]["latitude"] = req.body["latitude"];
	earthquakes[eid]["longitude"] = req.body["longitude"];
	earthquakes[eid]["depth"] = req.body["depth"];
	earthquakes[eid]["intensity"] = req.body["intensity"];

	// return
	res.json({"success":true});
	
    } else {
	
	// return
	res.json({"success":false});

    }

})


// DELETE
app.delete('/earthquakes', function(req, res){

    // debug print
    console.log("Invoked DELETE on /earthquakes");

    // delete the earthquakes
    for (k in earthquakes){
	if (earthquakes.hasOwnProperty(k)){
	    delete earthquakes[k];
	}
    }
    res.json({"success":true});

})


// DELETE
app.delete('/earthquakes/:id', function(req, res){

    // get the eid
    eid = req.params.id;

    // debug print
    console.log("Invoked DELETE on /earthquakes/" + eid);

    // delete the subscription
    if (earthquakes.hasOwnProperty(eid)){

	// delete the subscription
	delete earthquakes[eid];

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
