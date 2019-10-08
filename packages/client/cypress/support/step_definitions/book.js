Given('I open the boka-resa page', () => {
  cy.visit('/boka-resa')
})

// When('I type {string} as {string}', (input, fieldName) => {
//   cy.get(`[name="${fieldName}"]`).type(input)
// })

// When('I go back to {string}', string => {
//   cy.visit(string)
// })

// When('I press Fortsätt', () => {
//   cy.get('[data-testid="okButton"]')
//     .contains('Fortsätt')
//     .click()
// })

// Then('My {string} should still be set as {string}', (fieldName, expected) => {
//   cy.get(`[name="${fieldName}"]`).should('have.value', expected)
// })

// Then('My information has not be saved', () => {
//   cy.get('[name="name"]').should('have.value', '')
//   cy.get('[name="email"]').should('have.value', '')
// })

// Then(
//   'I should see an error that I also need to fill out {string}',
//   missing => {}
// )
