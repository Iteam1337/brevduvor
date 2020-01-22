# Brevduvor

Mono-repo for the Brevduvor-project.

## [Client](packages/client/)

A web client for initialising and consuming transports.

## [Drone Sender](packages/drone-sender/)

A client for initialising transports.

## [Drone Receiver](packages/drone-receiver/)

A client for receiving transports.

## [API](packages/api/)

A server for communicating with the client.

## [Drone Simulator](packages/drone-simulator/)

A service for simulating a drone.

## [Cypress-ci](packages/cypress-ci/)

Dockerized cypress for running e2e tests. If you update any cypress _configuration_, have an extra look here to see if it needs any update. If so, rebuild the image and push it to iteam1337/brevduvor-cypress:ci.

## Tests

When a PR is submitted, we run an e2e suite that builds all services and runs cypress on it. See [the e2e action](.github/workflows/e2e.yml) and [docker-compose.e2e.yml](docker-compose.e2e.yml) for more information.
