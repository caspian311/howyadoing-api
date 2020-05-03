#!/bin/bash

pushd $(dirname $0) &> /dev/null

npm install
bin/www

popd &> /dev/null
