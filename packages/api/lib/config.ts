const config = require('@iteam/config')({
  file: `${__dirname}/../config.json`,
  defaults: {
    PORT: 4000,
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
    JWT_PRIVATE_KEY: 'jwtdevkey',
    FLYPULSE: {
      HOST: '',
      USER: '',
      PASSWORD: '',
      WS: '',
    },
    DRONE: 13,
  },
})

export default {
  PORT: config.get('PORT'),
  WEBHOOK_URL: config.get('WEBHOOK_URL'),
  POSTGRES: config.get('POSTGRES'),
  JWT_SECRET: config.get('jwtPrivateKey'),
  FLYPULSE: config.get('FLYPULSE'),
  DRONE: config.get('DRONE'),
}
