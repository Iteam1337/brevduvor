FROM cypress/base:10

# Copy NPM & Install
COPY ./package*.json /tmp/
RUN cd /tmp && CI=true npm ci
RUN CI=true /tmp/node_modules/.bin/cypress install
RUN mkdir -p /e2e && cp -a /tmp/node_modules /e2e/

WORKDIR /e2e

COPY cypress.json /e2e/cypress.json

CMD ["./node_modules/.bin/cypress", "run" ]