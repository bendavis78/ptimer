// This file is processed and loaded automatically before your test files.
// This is a great place to put global configuration and behavior that modifies Cypress.

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import PouchDB from 'pouchdb';

Cypress.Commands.add('resetDatabase', () => {
  cy.window().then((win) => {
    const db = new PouchDB('workout_routine_db');
    return db.destroy().then(() => {
      win.location.reload();
    });
  });
});
