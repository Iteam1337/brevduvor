Given('I open the boka-resa page', () => {
  cy.visit('/boka-resa')
})

When('I select {string} as {string}', (input, fieldName) => {
  cy.get(`[name="select-${fieldName}"]`).select(input)
})

Then('I should see the {string} button', string => {
  cy.contains(string)
})

When('I press {string}', string => {
  cy.contains(string).click()
})

Then('I should see the {string} text', string => {
  cy.contains(string)
})
