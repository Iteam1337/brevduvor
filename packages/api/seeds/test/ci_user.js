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
      return knex.raw(
        `insert into "users"("email","name","password") values('ci@ci.com', 'CiOperatorsson', '${password}')`
      )
    })
}
