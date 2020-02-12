const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const registrationToken =
  'fXrtEsGnckrwnxarlRbWa7:APA91bFxoYupaM4qoEDR10MXs9h-G79lfNDAEVNAw9zoaJlI88FJ94zNTVxOnzuneTYbOjzaIRy2sjwkn-q4QzEEc43kNBUCPLCSQj0y9jnvwLn0TPkTGtCI6RDKKFqCXhxHQ4qHGczz'

const notification = {
  token: registrationToken,
  notification: {
    title: 'FCM Message',
    body: 'This is a message from FCM',
  },
}

exports.helloWorld = functions.https.onRequest((request, response) => {
  admin
    .messaging()
    .send(notification)
    .then(res => {
      return response.send('Successfully sent message')
    })
    .catch(error => {
      return response.send('Error sending message: ' + error.message)
    })
})
