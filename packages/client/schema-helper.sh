#!/bin/bash

 #npx get-graphql-schema http://localhost:4000/graphql > graphql_schema.json --json

START="{ \"data\": "
END="}"

COMMAND=`npx get-graphql-schema http://localhost:4000/graphql --json`

echo $START$COMMAND$END > graphql_schema.json
