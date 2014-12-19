#!/usr/bin/env sh

NSQLOOKUP_CID=$(docker run --name iv_nsqlookupd -p 4160:4160 -p 4161:4161 -d nsqio/nsqlookupd);
NSQLOOKUP_ADDRESS=$(docker inspect --format '{{ .NetworkSettings.IPAddress }}' ${NSQLOOKUP_CID})
echo $NSQLOOKUP_CID

docker run \
  --name iv_nsqd \
  --link iv_nsqlookupd:nsqlookupd \
  -d nsqio/nsqd --lookupd-tcp-address=${NSQLOOKUP_ADDRESS}:4160

docker run \
  --name iv_nsqadmin \
  --link iv_nsqlookupd:nsqlookupd \
  -p 4171:4171 \
  -d nsqio/nsqadmin --lookupd-http-address=${NSQLOOKUP_ADDRESS}:4161

docker run \
  --name iv_app \
  --link iv_nsqd:nsqd \
  --link iv_nsqlookupd:nsqlookupd \
  -v $(pwd)/app:/app \
  -p 8080:80 \
  youmeb/invoice-service make
