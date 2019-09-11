const config = require('@iteam/config')({
  file: `${__dirname}/../config.json`,
  defaults: {
    PORT: 4000,
    DRONE_URL: 'http://localhost:3030',
  },
})

export default {
  PORT: config.get('PORT'),
  DRONE_URL: config.get('DRONE_URL'),
}
