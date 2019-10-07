exports.up = pgm => {
  pgm.dropType('status')
  pgm.createExtension('uuid-ossp', { ifNotExists: true })
  pgm.createType('status', ['initating', 'starting', 'in progress', 'done'], {
    ifNotExists: true,
  })
  return pgm.createTable('drone_trips', {
    id: {
      type: 'uuid',
      notNull: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    drone_id: { type: 'uuid', primaryKey: true, notNull: true },
    allowed_spectators: { type: 'uuid[]' },
    finished: { type: 'boolean', default: false, notNull: true },
    start: { type: 'point', notNull: true },
    stop: { type: 'point', notNull: true },
    status: { type: 'status', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
}

exports.down = pgm => pgm.dropTable('drone_trips') && pgm.deleteType('status')