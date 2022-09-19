#!/bin/bash

read -p "Please enter route path: " path
read -p "Please enter route name: " name
echo "create:route: path: $path name: $name ..."
npm run create:route $path $name
npm run lint:fix