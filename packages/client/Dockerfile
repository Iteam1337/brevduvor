FROM node:12-alpine AS build

# Need some native dependencies for npm installation process 
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

WORKDIR /app

# add .bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm ci

COPY ./ /app

CMD npm run clean
CMD npm run build
CMD npm run webpack:production

# clean native deps
RUN apk del native-deps

# Second stage
FROM nginx

WORKDIR /

COPY --from=build ./app/dist/ /usr/share/nginx/html
COPY --from=build ./app/nginx.conf /etc/nginx/conf.d/default.conf