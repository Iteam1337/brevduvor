FROM node:10.16-alpine as base
ARG cache=1

WORKDIR /app

COPY package*.json ./
RUN npm install --verbose

COPY /lib ./lib

COPY jest.config.js ./
COPY tsconfig.json ./
COPY index.ts ./

RUN npm run build

FROM node:10.16.3

ENV USER=api-user
RUN adduser --disabled-password --gecos "" $USER

WORKDIR /app

COPY package*.json ./
RUN npm install --verbose

COPY --from=base /app/build  ./build


USER $USER

CMD npm start
