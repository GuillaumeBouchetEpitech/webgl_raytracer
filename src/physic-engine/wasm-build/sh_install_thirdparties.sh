#!/bin/bash

#
# INIT

mkdir -p ./src/thirdparty || exit 1
cd ./src/thirdparty || exit 1

DIR_THIRDPARTY=$PWD

#
# BULLET

cd $DIR_THIRDPARTY || exit 1

git clone --quiet --depth 1 --branch "2.87" https://github.com/bulletphysics/bullet3 ./bullet3 || exit 1

cd ./bullet3 || exit 1

git checkout tags/2.87 || exit 1

git log --oneline -1 || exit 1

#
# DEBUG
#

# git tag --list
# git log --oneline --graph

# git log --help
# git log HEAD
