FROM node:12
ARG cache=1

WORKDIR /app

COPY . .

RUN npm ci --quiet
CMD npm run dev