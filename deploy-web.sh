#! /bin/bash
yarn build:web
netlify deploy
netlify deploy --prod