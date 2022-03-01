#!/usr/bin/env bash

yarn install
yarn build

docker build -t rolf_ui .
docker rm -f rolf_ui || true
docker run -d --name rolf_ui -p 3003:80 --restart always rolf_ui
