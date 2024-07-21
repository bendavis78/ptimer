describe('Exercise List', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('http://localhost:3000')
    // Click on the Exercises tab
    cy.contains('Exercises').click()
  })

  it('loads the exercise list page', () => {
    cy.contains('Exercises').should('be.visible')
  })

  it('can add a new exercise', () => {
    cy.contains('Add Exercise').click()
    
    // Wait for the dialog to be visible
    cy.get('.MuiDialog-paper').should('be.visible')
    
    // Fill in the exercise details
    cy.get('input[name="name"]').type('Push-ups')
    cy.get('[data-testid="muscle-group-select"]').click()
    cy.get('[data-value="ARMS"]').click()
    cy.get('textarea[name="description"]').type('Basic push-ups')
    cy.get('input[name="sets"]').type('3')
    cy.get('input[name="repsPerSet"]').type('10')
    cy.get('input[name="holdTime"]').type('0')
    cy.get('input[name="bilateral"]').click()
    
    // Submit the form
    cy.contains('Add').click()
    
    // Verify that the new exercise appears in the list
    cy.contains('Push-ups').should('be.visible')
  })

  it('can edit an existing exercise', () => {
    // Click on the first exercise in the list
    cy.get('.MuiListItem-root').first().click()
    
    // Wait for the dialog to be visible
    cy.get('.MuiDialog-paper').should('be.visible')
    
    // Edit the exercise details
    cy.get('input[name="name"]').clear().type('Modified Push-ups')
    cy.get('input[name="sets"]').clear().type('4')
    
    // Save the changes
    cy.contains('Save').click()
    
    // Verify that the modified exercise appears in the list
    cy.contains('Modified Push-ups').should('be.visible')
  })

  it('can delete an exercise', () => {
    // Store the text of the first exercise
    cy.get('.MuiListItem-root').first().invoke('text').as('firstExerciseName')
    
    // Click on the first exercise in the list
    cy.get('.MuiListItem-root').first().click()
    
    // Wait for the dialog to be visible
    cy.get('.MuiDialog-paper').should('be.visible')
    
    // Click the delete button
    cy.contains('Delete').click()
    
    // Verify that the deleted exercise no longer appears in the list
    cy.get('@firstExerciseName').then((exerciseName) => {
      cy.contains(exerciseName).should('not.exist')
    })
  })
})
