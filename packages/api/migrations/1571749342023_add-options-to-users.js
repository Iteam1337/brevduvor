/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = pgm => {
  pgm.addColumns('users', {
    language: {
      type: 'varchar(8)',
    },
  })
}

exports.down = pgm => {
  pgm.dropColumns('users', 'language')
}
