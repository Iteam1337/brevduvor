FROM cypress/included:3.4.1
COPY package*.json ./
COPY cypress.json ./

COPY fixtures ./cypress
COPY integration ./cypress
COPY plugins ./cypress
COPY support ./cypress
COPY videos ./cypress

RUN npm ci
CMD "cypress run"
