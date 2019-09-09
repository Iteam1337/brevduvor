const { saveDroneStatus } = require('./../adapters/elastic-search')

async function receiveStatus(req, res) {
  try {
    // save in elastic as record
    await saveDroneStatus(req.body)
    return res.status(200)
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  receiveStatus,
}
