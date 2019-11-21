exports.up = knex => {
  return knex.schema
    .dropTableIfExists('users')
    .then(() => {
      knex.raw('create extension if not exists "uuid-ossp"')
      return knex.schema.createTable('users', table => {
        table
          .uuid('id')
          .primary()
          .notNullable()
          .defaultTo(knex.raw('uuid_generate_v4()'))
        table.string('name', 1000).notNullable()
        table.string('email', 128).notNullable()
        table.string('password', 128).notNullable()
        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable()
        table.string('language', 8)
      })
    })
    .then(_ => console.log('users migration OK!'))
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('users').then()
}
