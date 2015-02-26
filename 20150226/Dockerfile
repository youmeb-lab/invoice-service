FROM node:0.11.14

ENV YMIS_VERSION 20150226
ENV PATH $PATH:/ymis/app/bin

RUN wget "https://github.com/youmeb-lab/invoice-service/archive/$YMIS_VERSION.tar.gz" \
  && mkdir /ymis \
  && tar -xzf "$YMIS_VERSION.tar.gz" -C /ymis --strip-components=1 \
  && rm "$YMIS_VERSION.tar.gz" \
  && cd /ymis/app \
  && npm i \
  && npm cache clear

COPY docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
WORKDIR /ymis/app

CMD []
