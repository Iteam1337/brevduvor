exports.seed = knex => {
  return knex('bookings')
    .del()
    .then(async () => {
      return knex.raw(
        `INSERT INTO bookings (flypulse_mission_id, created_by, departure, destination, events)
          (SELECT 13, users.id, departure.id, destinations.id, '[{ "status": "CREATED", "created_at": "${new Date().toISOString()}"}]'
            FROM destinations, users, destinations AS departure
            WHERE destinations.alias = 'Storuman' AND users.name = 'Johnny1' AND departure.alias = 'Slussfors')`
      )
    })
}
