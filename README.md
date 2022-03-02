# Frontend for ROLF

## Install dependencies

Run one of the following commands:

```bash
yarn install
```
```bash
npm install
```

## Environment variables

This application needs following environment variables: REACT_APP_API_QUESTIONS_BASE. As an example:
```bash
REACT_APP_API_QUESTIONS_BASE=http://httpbin.org
```

## Site running

Site can be run by one of the next commands:
```bash
yarn start
```
```bash
npm start
```

## Building inside docker

Run `.\deploy.sh` script

## Usage

The site is started at [`http://127.0.0.1:3000`](http://127.0.0.1:3000) by default and at [`http://127.0.0.1:3003`](http://127.0.0.1:3003) via docker