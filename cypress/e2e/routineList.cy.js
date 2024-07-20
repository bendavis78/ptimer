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
    // Use a more specific selector for the Add button
    cy.get('.MuiDialogActions-root button:contains("Add")').click()
    cy.contains('My Test Routine').should('be.visible')
  })

  it('persists routines after page reload', () => {
    const routineName = 'Persistent Routine'
    
    // Add a new routine
    cy.visit('http://localhost:3000')
    cy.contains('Add Routine').click()
    cy.get('.MuiDialog-paper').should('be.visible')
    cy.get('#name').type(routineName)
    cy.get('.MuiDialogActions-root button:contains("Add")').click()
    cy.contains(routineName).should('be.visible')

    // Reload the page
    cy.reload()

    // Check if the routine is still there
    cy.contains(routineName).should('be.visible')
  })
})
