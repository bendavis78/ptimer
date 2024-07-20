describe('Routine List', () => {
  it('loads the routine list page', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Workout Routines').should('be.visible')
  })

  it('can add a new routine', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Add Routine').click()
    // Wait for the dialog to be visible
    cy.get('.MuiDialog-paper').should('be.visible')
    cy.get('#name').type('My Test Routine')
    // Add a small delay before clicking the Add button
    cy.wait(500)
    // Use force: true to click the button even if it's covered
    cy.contains('Add').click({ force: true })
    cy.contains('My Test Routine').should('be.visible')
  })
})
