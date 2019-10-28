FROM node:12
ARG cache=1

WORKDIR /app

COPY . .

RUN npm ci --quiet
RUN npm run build
RUN npm run webpack:production


CMD ["sh", "-c", "npx serve --listen 3000 --no-clipboard --single build"]