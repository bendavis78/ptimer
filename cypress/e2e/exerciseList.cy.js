describe('Exercise List', () => {
  beforeEach(() => {
    // Reset the database before each test
    cy.resetDatabase()
    // Visit the home page before each test
    cy.visit('http://localhost:3000')
    // Click on the Exercises tab
    cy.contains('Exercises').click()
    // Wait for the exercise list to be visible
    cy.get('[data-testid="exercise-list"]', { timeout: 10000 }).should('be.visible')
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
    cy.get('button[type="submit"]').click()
    
    // Verify that the new exercise appears in the list
    cy.contains('Push-ups').should('be.visible')
  })

  it('can edit an existing exercise', () => {
    // Add an exercise if the list is empty
    cy.get('[data-testid="exercise-item"]').then($items => {
      if ($items.length === 0) {
        cy.contains('Add Exercise').click()
        cy.get('input[name="name"]').type('Exercise to Edit')
        cy.get('[data-testid="muscle-group-select"]').click()
        cy.get('[data-value="ARMS"]').click()
        cy.contains('Add').click({ force: true })
      }
    })

    // Click on the first exercise in the list
    cy.get('[data-testid="exercise-item"]').first().click()
    
    // Wait for the dialog to be visible
    cy.get('.MuiDialog-paper').should('be.visible')
    
    // Edit the exercise details
    cy.get('input[name="name"]').clear().type('Modified Exercise')
    cy.get('input[name="sets"]').clear().type('4')
    
    // Save the changes
    cy.contains('Save').click({ force: true })
    
    // Verify that the modified exercise appears in the list
    cy.contains('Modified Exercise').should('be.visible')
  })

  it('can delete an exercise', () => {
    // Add an exercise if the list is empty
    cy.get('[data-testid="exercise-item"]').then($items => {
      if ($items.length === 0) {
        cy.contains('Add Exercise').click()
        cy.get('input[name="name"]').type('Exercise to Delete')
        cy.get('[data-testid="muscle-group-select"]').click()
        cy.get('[data-value="ARMS"]').click()
        cy.contains('Add').click({ force: true })
      }
    })

    // Store the text of the first exercise
    cy.get('[data-testid="exercise-item"]').first().invoke('text').then((exerciseName) => {
      // Click on the first exercise in the list
      cy.get('[data-testid="exercise-item"]').first().click()
      
      // Wait for the dialog to be visible
      cy.get('.MuiDialog-paper').should('be.visible')
      
      // Click the delete button
      cy.get('button').contains('Delete').click({ force: true })
      
      // Verify that the deleted exercise no longer appears in the list
      cy.contains(exerciseName).should('not.exist')
    })
  })
})
