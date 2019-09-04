const got = require('got')
const directions = require('./../directions');

async function init({ body: { start, stop, webhookUrl } }, res) {
  try {
    console.log(start, stop, webhookUrl);

    const webhookRes = await sendDroneStatus(webhookUrl, {
      start,
      stop,
      currentPos: start,
      distance: directions.getDistance(start, stop),
      bearing: 0,
      status: "initiating",
      vehicle: "Drone",
      batteryStatus: 1000
    });

    res.json({ status: 'OK' });
  } catch (error) {
    res.json({ status: "ERROR", error });
  }
}

async function sendDroneStatus(webhookUrl, postBody) {
  return got(webhookUrl, { body: postBody, json: true });
  //return "OK"
}

module.exports = {
  init
}
