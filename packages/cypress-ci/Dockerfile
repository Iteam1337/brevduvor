FROM cypress/base:10 as e2eBuild

# Copy NPM & Install
COPY ./package*.json /tmp/
RUN cd /tmp && CI=true npm ci
RUN CI=true /tmp/node_modules/.bin/cypress install
RUN mkdir -p /e2e && cp -a /tmp/node_modules /e2e/

WORKDIR /e2e
# Copy files for config
COPY cypress.json /e2e/cypress.json

# Run tests
CMD ["./node_modules/.bin/cypress", "run" ]