exports.up = async function(knex) {
  await knex.raw('create extension if not exists "uuid-ossp"')
  await knex.raw(
    `CREATE TYPE "status" AS enum ('initiating', 'starting', 'in progress', 'done')`
  )
  await knex.schema.createTable('drone_trips', table => {
    table
      .uuid('id')
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'))
    table
      .uuid('drone_id')
      .primary()
      .notNullable()
    table.specificType('allowed_spectators', 'UUID[]')
    table
      .boolean('finished')
      .defaultTo(false)
      .notNullable()
    table.specificType('start', 'POINT').notNullable()
    table.specificType('stop', 'POINT').notNullable()
    table.specificType('status', 'STATUS').notNullable()
    table
      .timestamp('created_at')
      .defaultTo(knex.fn.now())
      .notNullable()
  })
  console.log('***drone_trips migration OK!***')
}

exports.down = async knex => {
  await knex.schema.dropTableIfExists('drone_trips')
  await knex.raw('drop type status')
}
