Cypress.Commands.add('login', () => {
  cy.visit('/')
    .get('#username')
    .type('Kalle')
    .get('#password')
    .type('hunter2')
    .get('#submit')
    .click()
})
