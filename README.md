# Brevduvor

Mono-repo for the Brevduvor-project.

## [Client](packages/client/)

A web client for initialising and consuming transports.

## [API](packages/api/)

A server for communicating with the client.

## [Drone Simulator](packages/drone-simulator/)

A service for simulating a drone.

## Run project

Make sure you have node and docker/docker-compose installed and available in your terminal client.

### Start API

[Local development](packages/api/README.md)

Start services through docker-compose:

```
cd packages/api
docker-compose up -d
```

Starts up the service at `localhost:4000`
GraphQL Playground `localhost:4000/graphql`

### Start Drone Simulator

[Local development](packages/drone-simulator/README.md)

Start services through docker-compose:

```
cd packages/drone-simulator
docker-compose up -d
```

Starts up the service at `localhost:3031`

### Start Client

[Local development](packages/drone-simulator/README.md)

Start services through docker-compose:

```
cd packages/client
docker-compose up -d
```

Starts up the client at `localhost:3001`
