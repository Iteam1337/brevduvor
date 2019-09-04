const config = require('@iteam/config')({
  file: `${__dirname}/../config.json`,
  defaults: {
    port: 3000,
    osrm: 'http://localhost:5000',
  },
})

module.exports = {
  port: config.get('port'),
  osrm: config.get('osrm'),
}
