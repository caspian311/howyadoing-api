#!/bin/bash

pushd $(dirname $0) &> /dev/null

npm install
npx sequelize-cli db:migrate

popd &> /dev/null
