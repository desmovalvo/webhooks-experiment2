#!/bin/bash

echo "Creating subscription"
curl -X POST http://localhost:3000/subscriptions/ --header "Content-Type: application/json" -d '{"postHost":"wot.arces.unibo.it", "postPort":"4567", "postPath":"/github-nots"}' -v
