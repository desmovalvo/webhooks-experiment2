#!/bin/bash

echo "Deleting all the subscriptions"
curl -X DELETE --header "Content-Type: application/json" http://localhost:3000/subscriptions -v
