const config = require('@iteam/config')({
  file: `${__dirname}/../config.json`,
  defaults: {
    port: 3000,
    osrm: 'http://localhost:5000',
    redis: {
      host: '127.0.0.1',
      port: 6379,
    },
    elasticSearch: 'http://localhost:9200',
  },
})

module.exports = {
  port: config.get('port'),
  osrm: config.get('osrm'),
  redis: config.get('redis'),
}
