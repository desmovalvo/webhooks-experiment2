#!/bin/bash

echo "Deleting earthquake" $1
curl -X DELETE --header "Content-Type: application/json" http://localhost:3000/earthquakes/$1 -v
