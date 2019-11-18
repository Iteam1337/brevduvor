FROM node:lts AS builder

WORKDIR /app

COPY . .

ARG MAPBOX_TOKEN
ARG GRAPHQL_API
ARG GRAPHQL_WS_URI

RUN npm install --quiet
RUN npm run build
RUN npm run webpack:production

FROM nginx:stable

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

RUN touch /var/run/nginx.pid && chown nginx:nginx /var/run/nginx.pid

RUN apt-get update && apt-get install -y --no-install-recommends curl \
  && rm -rf /var/lib/apt/lists/*

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]