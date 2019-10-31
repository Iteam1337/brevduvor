#!/usr/bin/env bash

export DATABASE_URL="postgres://$PSQL_USER:$PSQL_PASSWORD@$PSQL_HOST:5432/$PSQL_DATABASE"

npm run migrate:prod up