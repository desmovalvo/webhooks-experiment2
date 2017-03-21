#!/bin/bash

echo "Creating earthquake"

# generate a timestamp

# generate latitude and longitude
lat=$(cat /dev/urandom | tr -dc '0-9' | fold -w 256 | head -n 1 | head --bytes 1)
lon=$(cat /dev/urandom | tr -dc '0-9' | fold -w 256 | head -n 1 | head --bytes 1)

# generate depth and intensity
depth=$(cat /dev/urandom | tr -dc '0-9' | fold -w 256 | head -n 1 | head --bytes 1)
inten=$(cat /dev/urandom | tr -dc '0-9' | fold -w 256 | head -n 1 | head --bytes 1)

# post data
data="'{\"timestamp\":\"2340293\", \"depth\":${depth}, \"intensity\":${inten}, \"latitude\":${lat}, \"longitude\":${lon}}'"
echo $data
cmd="curl -X POST http://localhost:3000/earthquakes/ --header 'Content-Type: application/json' -vvv -d $data"
echo $cmd
eval $cmd
