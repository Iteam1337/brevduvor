// Update with your config settings.

module.exports = {
  test: {
    client: 'pg',
    connection: 'postgres://iteamadmin:adminadmin1337@postgres:5432/brevduvor',
    seeds: {
      directory: __dirname + '/seeds/test',
    },
  },
}
