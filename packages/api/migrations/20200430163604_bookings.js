exports.up = knex => {
  return knex
    .raw('create extension if not exists "uuid-ossp"')
    .then(_ =>
      knex.schema.createTable('bookings', table => {
        table
          .uuid('id')
          .primary()
          .notNullable()
          .defaultTo(knex.raw('uuid_generate_v4()'))

        table.integer('flypulse_mission_id')
        table
          .timestamp('created_at')
          .defaultTo(knex.fn.now())
          .notNullable()

        table.uuid('created_by')
        table
          .foreign('created_by')
          .references('id')
          .inTable('users')
          .onDelete('SET NULL')

        table.uuid('departure')
        table
          .foreign('departure')
          .references('id')
          .inTable('destinations')
          .onDelete('SET NULL')

        table.uuid('destination')
        table
          .foreign('destination')
          .references('id')
          .inTable('destinations')
          .onDelete('SET NULL')
      })
    )
    .then(_ => console.log('***users migration OK!***'))
}

exports.down = knex => {
  return knex.schema.dropTableIfExists('bookings').then()
}
