#! /bin/bash
yarn build:server
heroku container:push --app=sonacy-canteen web
heroku container:release --app=sonacy-canteen web