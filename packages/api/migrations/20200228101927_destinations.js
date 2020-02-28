exports.up = knex => {
  return knex
    .raw('create extension if not exists "uuid-ossp"')
    .then(_ =>
      knex.schema.createTable('destinations', table => {
        table
          .uuid('id')
          .primary()
          .notNullable()
          .defaultTo(knex.raw('uuid_generate_v4()'))
        table.string('alias', 128).notNullable()
        table.float('lat', 8).notNullable()
        table.float('lon', 8).notNullable()
        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable()
      })
    )
    .then(_ => console.log('***destinations migration OK!***'))
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('destinations').then()
}
