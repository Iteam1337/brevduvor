FROM cypress/base:10 as e2eBuild

# Copy NPM & Install
COPY ./cypress/package.json /tmp/package.json
RUN cd /tmp && CI=true npm install
RUN CI=true /tmp/node_modules/.bin/cypress install
RUN mkdir -p /e2e && cp -a /tmp/node_modules /e2e/

WORKDIR /e2e
# Copy files for config
COPY ./cypress/cypress.json /e2e

# Run tests
CMD ["./node_modules/.bin/cypress", "run" ]