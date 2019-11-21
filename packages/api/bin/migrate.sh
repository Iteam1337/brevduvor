#!/usr/bin/env bash
export DATABASE_URL=postgres://$POSTGRES__USER:$POSTGRES__PASSWORD@$POSTGRES__HOST:5432/$POSTGRES__DATABASE
./node_modules/.bin/knex migrate:latest --env $DB_ENV