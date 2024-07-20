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
    cy.contains('Add').click()
    cy.contains('My Test Routine').should('be.visible')
  })
})
