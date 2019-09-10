const config = require('@iteam/config')({
  file: `${__dirname}/../config.json`,
  defaults: {
    SERVER_PORT: 4000,
  },
})

module.exports = {
  foo: config.get('foo'),
  SERVER_PORT: config.get('SERVER_PORT'),
}
