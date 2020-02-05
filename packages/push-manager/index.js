const admin = require('firebase-admin')
require('dotenv').config()
const registrationToken = process.env.REGISTRATION_TOKEN
console.log(process.env.REGISTRATION_TOKEN)

const notification = {
  token: registrationToken,
  notification: {
    title: 'FCM Message',
    body: 'This is a message from FCM',
  },
}

admin.initializeApp({ credential: admin.credential.applicationDefault() })

admin
  .messaging()
  .send(notification)
  .then(response => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response)
  })
  .catch(error => {
    console.log('Error sending message:', error)
  })
