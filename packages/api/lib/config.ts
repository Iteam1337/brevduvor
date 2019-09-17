const config = require('@iteam/config')({
  file: `${__dirname}/../config.json`,
  defaults: {
    PORT: 4000,
    DRONE_URL: 'http://localhost:3030',
    OSRM_URL: 'http://localhost:5000',
    ELASTIC_URL: 'http://localhost:9200',
  },
})

export default {
  PORT: config.get('PORT'),
  DRONE_URL: config.get('DRONE_URL'),
  OSRM_URL: config.get('OSRM_URL'),
  ELASTIC_URL: config.get('ELASTIC_URL'),
}
