#!/usr/bin/env sh

NSQLOOKUP_CID=$(docker run --name ${YMIS_CONTAINER_NAME_PREFIX}nsqlookupd -p 4160:4160 -p 4161:4161 -d nsqio/nsqlookupd);
NSQLOOKUP_ADDRESS=$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' ${NSQLOOKUP_CID})
echo $NSQLOOKUP_CID

docker run \
  --name ${YMIS_CONTAINER_NAME_PREFIX}nsqd \
  --link ${YMIS_CONTAINER_NAME_PREFIX}nsqlookupd:nsqlookupd \
  -d nsqio/nsqd --lookupd-tcp-address=${NSQLOOKUP_ADDRESS}:4160

docker run \
  --name ${YMIS_CONTAINER_NAME_PREFIX}nsqadmin \
  --link ${YMIS_CONTAINER_NAME_PREFIX}nsqlookupd:nsqlookupd \
  -p 4171:4171 \
  -d nsqio/nsqadmin --lookupd-http-address=${NSQLOOKUP_ADDRESS}:4161

docker run \
  --name ${YMIS_CONTAINER_NAME_PREFIX}app \
  --link ${YMIS_CONTAINER_NAME_PREFIX}nsqd:nsqd \
  --link ${YMIS_CONTAINER_NAME_PREFIX}nsqlookupd:nsqlookupd \
  -v $(pwd)/app:/app \
  -p 8080:80 \
  -it \
  ${YMIS_IMAGE} bash
