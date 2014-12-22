#!/usr/bin/env sh

docker stop $(docker ps -a -q --filter="name=${YMIS_CONTAINER_NAME_PREFIX}")
docker rm $(docker ps -a -q --filter="name=${YMIS_CONTAINER_NAME_PREFIX}")
