FROM node:lts AS builder
ARG cache=1

WORKDIR /app

COPY . .

ARG MAPBOX_TOKEN
ENV MAPBOX_TOKEN=$MAPBOX_TOKEN

ARG GRAPHQL_API
ENV GRAPHQL_API=$GRAPHQL_API

ARG GRAPHQL_WS_URI
ENV GRAPHQL_WS_URI=$GRAPHQL_WS_URI

RUN printf "MAPBOX_TOKEN=$MAPBOX_TOKEN\n" >> .env
RUN printf "GRAPHQL_API=$GRAPHQL_API\n" >> .env
RUN printf "GRAPHQL_WS_URI=$GRAPHQL_WS_URI" >> .env

RUN npm install --quiet
RUN npm run build
RUN npm run webpack:production

FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

RUN touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
