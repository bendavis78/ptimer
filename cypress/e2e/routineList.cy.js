describe('Routine List', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('loads the routine list page', () => {
    cy.contains('Routines').should('be.visible')
  })

  it('can add a new routine', () => {
    cy.contains('Add Routine').click()
    cy.get('.MuiDialog-paper').should('be.visible')
    cy.get('#name').type('My Test Routine')
    cy.get('[data-testid="dialog-add-button"]').click()
    cy.contains('My Test Routine').should('be.visible')
  })

  it('persists routines after page reload', () => {
    const routineName = 'Persistent Routine'
    
    cy.contains('Add Routine').click()
    cy.get('.MuiDialog-paper').should('be.visible')
    cy.get('#name').type(routineName)
    cy.get('[data-testid="dialog-add-button"]').click()
    cy.contains(routineName).should('be.visible')

    cy.reload()

    cy.contains(routineName).should('be.visible')
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
    cy.get('input[name="name"]').type('Exercise 1')
    cy.get('[data-testid="muscle-group-select"]').click()
    cy.get('[data-value="ARMS"]').click()
    cy.contains('Add').click()
    
    cy.contains('Add Exercise').click()
    cy.get('input[name="name"]').type('Exercise 2')
    cy.get('[data-testid="muscle-group-select"]').click()
    cy.get('[data-value="LEGS"]').click()
    cy.contains('Add').click()
    
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
})
