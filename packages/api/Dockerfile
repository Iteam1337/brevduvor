FROM node:lts-alpine as base
ARG cache=1

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY /bin ./bin
COPY /lib ./lib
COPY /migrations ./migrations

COPY jest.config.js ./
COPY tsconfig.json ./
COPY index.ts ./

RUN npm run build

FROM node:lts

ENV USER=api-user
RUN adduser --disabled-password --gecos "" $USER

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY --from=base /app/build  ./build
COPY --from=base /app/migrations  ./migrations
COPY --from=base /app/bin  ./bin

USER $USER

CMD npm start
