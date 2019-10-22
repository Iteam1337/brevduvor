const config = require('@iteam/config')({
  file: `${__dirname}/../config.json`,
  defaults: {
    PORT: 4000,
    DRONE_URL: 'http://localhost:3030',
    OSRM_URL: 'http://localhost:5000',
    ELASTIC_URL: 'http://localhost:9200',
    WEBHOOK_URL: 'http://localhost:4000/status',
    POSTGRES: {
      USER: 'iteamadmin',
      PASSWORD: 'adminadmin1337',
      DATABASE: 'brevduvor',
      PORT: 5432,
      HOST: 'localhost',
      MAX: 20,
      timeout: 30000,
    },
  },
})

export default {
  PORT: config.get('PORT'),
  DRONE_URL: config.get('DRONE_URL'),
  OSRM_URL: config.get('OSRM_URL'),
  ELASTIC_URL: config.get('ELASTIC_URL'),
  WEBHOOK_URL: config.get('WEBHOOK_URL'),
  POSTGRES: config.get('POSTGRES'),
  JWT_SECRET: config.get('jwtPrivateKey'),
}
