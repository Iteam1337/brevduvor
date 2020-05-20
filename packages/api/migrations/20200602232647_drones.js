exports.up = knex => {
  return knex
    .raw('create extension if not exists "uuid-ossp"')
    .then(_ =>
      knex.raw(
        `CREATE TYPE "status" AS enum ('loaded', 'in progress', 'ready to land', 'done')`
      )
    )
    .then(_ =>
      knex.schema.createTable('drones', table => {
        table
          .uuid('id')
          .primary()
          .notNullable()
          .defaultTo(knex.raw('uuid_generate_v4()'))
        table.integer('external_id').notNullable()
        table.string('status', 'STATUS')
        table.uuid('booking')
        table
          .foreign('booking')
          .references('id')
          .inTable('bookings')
          .onDelete('SET NULL')
      })
    )
    .then(_ => console.log('***drones migration OK!***'))
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('drones').then()
}
