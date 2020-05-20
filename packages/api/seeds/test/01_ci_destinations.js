exports.seed = knex => {
  return knex('destinations')
    .del()
    .then(() => {
      return knex('destinations').insert([
        { alias: 'Storuman', lat: 65.090833, lon: 17.1075 },
        { alias: 'Kvikkjokk', lat: 66.9501067, lon: 17.70861 },
        { alias: 'Slussfors', lat: 65.4308046, lon: 16.2481741 },
        { alias: 'Trollhättan test start', lat: 58.243844, lon: 12.261304 },
        { alias: 'Trollhättan test stop', lat: 58.243258, lon: 12.262483 },
      ])
    })
}
