exports.seed = knex => {
  return knex('destinations')
    .del()
    .then(() => {
      return knex('destinations').insert([
        { alias: 'Storuman', lat: 65.090833, lon: 17.1075 },
        { alias: 'Kvikkjokk', lat: 66.9501067, lon: 17.70861 },
        { alias: 'Slussfors', lat: 65.4308046, lon: 16.2481741 },
      ])
    })
}
