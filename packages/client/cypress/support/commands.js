const ciUser = {
  email: 'ci@ci.com',
  username: 'ciuser',
  password: '1234',
}

Cypress.Commands.add('login', () => {
  cy.visit('/')
    .wait(500)
    .get('#email')
    .type(ciUser.email)
    .get('#password')
    .type(ciUser.password)
    .get(`[type="submit"]`)
    .click()
    .wait(500)
})

const host = 'http://localhost:4000'

function registerUser() {
  const query = {
    query: `mutation { register(input: { email: "${ciUser.email}", username: "${ciUser.username}", password: "${ciUser.password}", confirmPassword: "${ciUser.password}" }) { id token username } }`,
  }

  return cy
    .request({
      url: `${host}/graphql`,
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => cy.log(JSON.stringify(res)))
}

Cypress.Commands.add('register', registerUser)

/**
 * Below code slows down execution time by overwriting
 * and adding a delay. Comment out if not want.
 */
;(() => {
  const COMMAND_DELAY = 500

  for (const command of [
    'visit',
    'click',
    'trigger',
    'type',
    'clear',
    'reload',
    'contains',
  ]) {
    Cypress.Commands.overwrite(command, (originalFn, ...args) => {
      const origVal = originalFn(...args)

      return new Promise(resolve => {
        setTimeout(() => {
          resolve(origVal)
        }, COMMAND_DELAY)
      })
    })
  }
})()
