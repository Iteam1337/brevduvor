const { kdf, pickParams } = require('scrypt-kdf')

const createHash = async pw => {
  const params = await pickParams(0.1)

  return (await kdf(pw, params)).toString('base64')
}

exports.seed = knex => {
  return knex('users')
    .del()
    .then(async () => {
      const password = await createHash('12341234')

      return knex
        .raw(
          `INSERT INTO users (email, name, password, destination) (SELECT 'johnny1@email.com', 'Johnny1', '${password}', destination.id FROM destinations AS destination WHERE destination.alias = 'Storuman')`
        )
        .then(_ =>
          knex.raw(
            `INSERT INTO users (email, name, password, destination) (SELECT 'johnny2@email.com', 'Johnny2', '${password}', destination.id FROM destinations AS destination WHERE destination.alias = 'Slussfors')`
          )
        )
    })
}
