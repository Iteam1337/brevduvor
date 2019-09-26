exports.up = pgm =>
  pgm.createTable('users', {
    id: 'id',
    name: { type: 'varchar(1000)', notNull: true },
    email: { type: 'varchar(128)' },
    password: { type: 'varchar(128)' },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })

exports.down = pgm => pgm.dropTable('users')
