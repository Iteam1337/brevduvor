FROM node:10.16-alpine as base
ARG cache=1

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY /lib ./lib
COPY /migrations ./migrations

COPY jest.config.js ./
COPY tsconfig.json ./
COPY index.ts ./

RUN npm run build

FROM node:10.16.3

ENV USER=api-user
RUN adduser --disabled-password --gecos "" $USER

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --from=base /app/build  ./build
COPY --from=base /app/migrations  ./migrations

USER $USER

CMD npm start
