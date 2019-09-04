const got = require('got')

async function init({ body: { start, stop, webhookUrl } }) {
  console.log(start, stop, webhookUrl)
}

async function sendStatus(webhookUrl, body) {
  return got.post(webhookUrl, body)
}

async function moveDrone(coords) {
  //move drone

  sendStatus()
}

module.exports = {
  init,
}
