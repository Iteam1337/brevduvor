const ciUser = {
  email: 'ci@ci.com',
  username: 'ciuser',
  password: '12341234',
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

/**
 * Below code slows down execution time by overwriting
 * and adding a delay. Comment out if not want.
 */
// ;(() => {
//   const COMMAND_DELAY = 500

//   for (const command of [
//     'visit',
//     'click',
//     'trigger',
//     'type',
//     'clear',
//     'reload',
//     'contains',
//   ]) {
//     Cypress.Commands.overwrite(command, (originalFn, ...args) => {
//       const origVal = originalFn(...args)

//       return new Promise(resolve => {
//         setTimeout(() => {
//           resolve(origVal)
//         }, COMMAND_DELAY)
//       })
//     })
//   }
// })()
