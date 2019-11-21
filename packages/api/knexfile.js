// Update with your config settings.

module.exports = {
  client: 'pg',
  dev: {
    client: 'pg',
    connection: 'postgres://iteamadmin:adminadmin1337@localhost:5432/brevduvor',
    seeds: {
      directory: __dirname + '/seeds/test',
    },
  },
  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: __dirname + '/seeds/test',
    },
  },
  prod: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: __dirname + '/seeds/test',
    },
  },
}
