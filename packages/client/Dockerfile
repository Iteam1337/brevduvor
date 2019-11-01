FROM node:12 AS builder
ARG cache=1

WORKDIR /app

COPY . .

ARG MAPBOX_TOKEN
ENV MAPBOX_TOKEN=$MAPBOX_TOKEN

ENV GRAPHQL_API=https://api.brevduvor.iteamdev.se/graphql
ENV GRAPHQL_WS_URI=wss://api.brevduvor.iteamdev.se/graphql

RUN npm install --quiet
RUN npm run build
RUN npm run webpack:production

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

RUN touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]