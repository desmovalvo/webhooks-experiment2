#!/bin/bash

echo "Deleting subscription" $1
curl -X DELETE --header "Content-Type: application/json" http://localhost:3000/subscriptions/$1 -v
