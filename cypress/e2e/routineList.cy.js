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
})
