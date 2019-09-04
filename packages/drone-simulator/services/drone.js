const got = require('got')

async function init({ body: { start, stop, webhookUrl } }) {
  console.log(start, stop, webhookUrl)
}

async function sendStatus(webhookUrl) {}

module.exports = {
  init
}
