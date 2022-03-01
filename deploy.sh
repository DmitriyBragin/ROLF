#!/usr/bin/env bash

yarn install
yarn build

docker build -t rolf_ui .
docker run -d --name rolf_ui -p 3003:80 --restart always rolf_ui

sudo rsync -avP nginx/people.conf /etc/nginx/conf.d/
sudo nginx -t && sudo nginx -s reload
sudo certbot --nginx -d people.itsociety.su
