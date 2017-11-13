#!/bin/bash
dir_test=./node_modules
if [ -n $NODE_ENV ]
then
  if [ ! -d dist ]
  then
    mkdir dist
  fi
  echo "NODE_ENV is $NODE_ENV"
  if [ ! -d $dir_test ]
  then
    echo "NPM UPDATE!"
    yarn install --ignore-engines
  fi

  if [ "$NODE_ENV" == 'development' ]
  then
    echo "DEVELOPMENT MODE ::."
    yarn dev
  else
    echo "PRODUCTION MODE ::."
    yarn start
    exit
  fi
fi
