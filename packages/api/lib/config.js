const config = require('@iteam/config')({
  file: `${__dirname}/../config.json`,
  defaults: {
    SERVER_PORT: 4000,
    DRONE_URL: 'http://localhost:3030',
  },
})

module.exports = {
  SERVER_PORT: config.get('SERVER_PORT'),
  DRONE_URL: config.get('DRONE_URL'),
}
