exports.seed = knex => {
  return knex('drones')
    .del()
    .then(() => {
      return knex('drones').insert([{ external_id: 13 }])
    })
}
