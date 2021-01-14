#!/bin/bash
#######################################
# Build Gateway Sidecar image
#######################################

. ./scripts/setup.sh

SECONDS=0

./cleanup.sh
printMessage "clean up" $?

printf "Cleaning up old image $MF_GATEWAY_IMAGE\n"
docker rmi $MF_GATEWAY_IMAGE

cd $ROOT_DIR/gateway
set -x
DOCKER_BUILD=1 docker build --no-cache -t $MF_GATEWAY_IMAGE .
res=$?
set +x
printMessage "Create image ${MF_GATEWAY_IMAGE}" $res

duration=$SECONDS
printf "${GREEN}$(($duration / 60)) minutes and $(($duration % 60)) seconds elapsed.\n\n${NC}"
