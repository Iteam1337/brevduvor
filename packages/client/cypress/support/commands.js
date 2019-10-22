Cypress.Commands.add('login', () => {
  cy.visit('/')
    .get('#username')
    .type('Kalle')
    .get('#password')
    .type('hunter2')
    .get(`[type="submit"]`)
    .click()
})

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
