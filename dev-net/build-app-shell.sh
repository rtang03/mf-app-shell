#!/bin/bash
#######################################
# Build App Shell image
#######################################

. ./scripts/setup.sh

SECONDS=0

./cleanup.sh
printMessage "clean up" $?

printf "Cleaning up old image $MF_SHELL_IMAGE\n"
docker rmi $MF_SHELL_IMAGE

cd $ROOT_DIR/app-shell
set -x
DOCKER_BUILD=1 docker build --no-cache -t $MF_SHELL_IMAGE .
res=$?
set +x
printMessage "Create image ${MF_SHELL_IMAGE}" $res

duration=$SECONDS
printf "${GREEN}$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed.\n\n${NC}"
