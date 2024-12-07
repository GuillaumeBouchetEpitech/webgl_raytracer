#!/bin/bash

#
##

mkdir -p ./tools
cd ./tools

git clone https://github.com/emscripten-core/emsdk.git

cd emsdk

./emsdk install sdk-1.39.4
./emsdk activate --embedded sdk-1.39.4

. ./emsdk_env.sh

em++ --clear-cache

##
#
