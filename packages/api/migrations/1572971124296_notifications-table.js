/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.createExtension('uuid-ossp', { ifNotExists: true })
  return pgm.createTable('notifications', {
    id: {
      type: 'uuid',
      default: pgm.func('uuid_generate_v4()'),
      primaryKey: true,
      notNull: true,
    },
    receiver: { type: 'varchar(256)', notNull: true },
    sender: { type: 'varchar(256)', notNull: true },
    message: { type: 'text', notNull: true },
    sentAt: {
      type: 'timestamp',
      notNull: true,
    },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
}

exports.down = pgm => pgm.dropTable('notifications')
