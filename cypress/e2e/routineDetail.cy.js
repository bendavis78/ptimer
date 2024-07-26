describe('Routine Detail', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('can reorder exercises within a routine', () => {
    const routineName = 'Routine for Reordering'
    
    // Create a new routine
    cy.contains('Add Routine').click()
    cy.get('#name').type(routineName)
    cy.get('[data-testid="dialog-add-button"]').click()
    
    // Navigate to the routine details
    cy.contains(routineName).click()
    
    // Add two exercises to the routine
    cy.contains('Add Exercise').click()
    cy.get('.MuiDialog-paper').should('be.visible')
    cy.contains('Exercise 1').click()
    cy.contains('Add to Routine').click()
    
    cy.contains('Add Exercise').click()
    cy.get('.MuiDialog-paper').should('be.visible')
    cy.contains('Exercise 2').click()
    cy.contains('Add to Routine').click()
    
    // Check initial order
    cy.get('[data-testid="exercise-item"]').eq(0).should('contain', 'Exercise 1')
    cy.get('[data-testid="exercise-item"]').eq(1).should('contain', 'Exercise 2')
    
    // Perform drag and drop
    cy.get('[data-testid="exercise-item"]').eq(1)
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', { clientX: 100, clientY: -100 })
      .trigger('mouseup', { force: true })
    
    // Check new order
    cy.get('[data-testid="exercise-item"]').eq(0).should('contain', 'Exercise 2')
    cy.get('[data-testid="exercise-item"]').eq(1).should('contain', 'Exercise 1')
  })

  it('navigates to routine details when a routine is clicked', () => {
    const routineName = 'Routine for Navigation'
    
    cy.contains('Add Routine').click()
    cy.get('#name').type(routineName)
    cy.get('[data-testid="dialog-add-button"]').click()
    
    cy.contains(routineName).click()
    
    cy.url().should('include', `/routine/${encodeURIComponent(routineName)}`)
    cy.contains(routineName).should('be.visible')
  })
})
