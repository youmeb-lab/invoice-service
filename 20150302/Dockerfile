FROM node:0.11.14

ENV YMIS_VERSION 20150302
ENV PATH $PATH:/ymis/app/bin:/ymis/app/node_modules/.bin

RUN wget "https://github.com/youmeb-lab/invoice-service/archive/$YMIS_VERSION.tar.gz" \
  && mkdir /ymis \
  && tar -xzf "$YMIS_VERSION.tar.gz" -C /ymis --strip-components=1 \
  && rm "$YMIS_VERSION.tar.gz" \
  && cd /ymis/app \
  && npm i \
  && npm cache clear

WORKDIR /ymis/app

CMD ["pm2", "start", "--no-daemon", "processes.json"]
