#!/bin/bash

my_border_print() {
    for index in $(seq 1 ${1})
    do
        echo -n "#"
    done
    echo ""
}

my_title_print() {
    MESSAGE=${1}
    MESSAGE_SIZE=${#1}
    BORDER_SIZE=$(($MESSAGE_SIZE + 6))

    my_border_print ${BORDER_SIZE}
    echo "## ${MESSAGE} ##"
    my_border_print ${BORDER_SIZE}
}

my_title_print "BUILDING"

echo ""
echo "Shell=> ${SHELL}"
echo ""
echo "Build what?"
echo "=> C++ Bullet Wrapper: 1"
echo "=> C++ Bullet Library: 2"
echo "=> TS generate types:  3"
echo ""

read USER_INPUT

# setup_emscripten_env() {
#     EMSDK_ENV_SCRIPT=$(locate --basename '\emsdk_env.sh');
#     WORK_VERSION=~/Documents/Programming/tools/emsdk/emsdk_env.sh
#     HOME_VERSION=~/Documents/Programming/cpp/emscripten/emsdk_portable/emsdk_env.sh

#     if [ -f ${WORK_VERSION} ]
#     then
#         EMSDK_ENV_SCRIPT=${WORK_VERSION}
#     elif [ -f ${HOME_VERSION} ]
#     then
#         EMSDK_ENV_SCRIPT=${HOME_VERSION}
#     fi

#     if [ ! -f ${EMSDK_ENV_SCRIPT} ];
#     then
#         echo "\"emsdk_env.sh\" not found" >&2
#         exit 0
#     fi;

#     echo "EMSDK_ENV_SCRIPT=${EMSDK_ENV_SCRIPT}"

#     EMSDK_ENV_DIR=$(dirname ${EMSDK_ENV_SCRIPT})
#     CURR_DIR=${PWD}

#     cd ${EMSDK_ENV_DIR}
#     . ${EMSDK_ENV_SCRIPT}
#     cd ${CURR_DIR}

#     my_title_print ${EMSCRIPTEN}
# }


# . ~/.bashrc
# . tools/emsdk/emsdk_env.sh

case ${USER_INPUT} in
  1)
    echo "=> building C++ Bullet Wrapper"
    # setup_emscripten_env
    make fclean
    make all -j7
    # cp ./build/* ./demo_threejs/dist/

    # my_title_print "DONE: building C++ Bullet Wrapper"
    ;;
  2)
    echo "=> building C++ Bullet Library"
    # setup_emscripten_env
    make fclean_bullet
    make bullet -j7
    # cp ./build/* ./demo/dist/

    # my_title_print "DONE: building C++ Bullet Library"
    ;;
  3)
    # npx webidl-dts-gen -ed -n bulletjs -i bulletjs.idl -o ../../types/bulletjs.d.ts
    npx webidl-dts-gen -ed -n bulletjs -i bulletjs.idl -o ../ts-framework/framework/physics/bulletjs.d.ts
    ;;
  *)
    echo "=> INVALID CHOICE"
    ;;
esac
