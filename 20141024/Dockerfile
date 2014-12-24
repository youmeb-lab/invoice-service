FROM node:0.11.14

ENV YMIS_VERSION 20141224
ENV PATH $PATH:/ymis/app/bin

RUN curl -SL0 "https://github.com/youmeb-lab/media-service/releases/download/$YMIS_VERSION/source.tar.gz" \
  && tar -xzf source.tar.gz -C /ymis --strip-components=1 \
  && rm source.tar.gz \
  && cd /ymis/app \
  && npm i \
  && npm cache clear

WORKDIR /app

CMD ["ymis"]
