#! /bin/bash
yarn build:server
heroku container:push --app=vast-hollows-20713 web
heroku container:release --app=vast-hollows-20713 web