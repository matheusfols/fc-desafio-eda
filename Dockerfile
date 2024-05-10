FROM node:latest

WORKDIR /usr/src/app

ENV DOCKERIZE_VERSION v0.7.0

RUN apt-get update \
  && apt-get install -y wget nano \
  && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
  && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install -y nano
RUN apt-get update && apt-get install -y librdkafka-dev
COPY package.json ./
RUN npm install --quiet

COPY . .

EXPOSE 8080

# ENTRYPOINT ["./start.sh"]

CMD ["tail", "-f", "/dev/null"]