#!/usr/bin/env sh

docker stop $(docker ps -a -q --filter="name=iv_")
docker rm $(docker ps -a -q --filter="name=iv_")
