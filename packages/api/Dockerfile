FROM node:lts-alpine as base
ARG cache=1

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY /bin ./bin
COPY /lib ./lib
COPY /migrations ./migrations
COPY /seeds ./seeds

COPY jest.config.js ./
COPY tsconfig.json ./
COPY knexfile.js ./
COPY index.ts ./

RUN npm run build

FROM node:lts

ENV USER=api-user
RUN adduser --disabled-password --gecos "" $USER

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=base /app/build ./build
COPY --from=base /app/migrations ./migrations
COPY --from=base /app/seeds ./seeds
COPY --from=base /app/knexfile.js ./knexfile.js
COPY --from=base /app/bin ./bin

USER $USER

CMD npm start
