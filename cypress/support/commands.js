// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('enterPassword', () => {
    cy.url().then((currentUrl) => {
        if (currentUrl === 'https://cookeys.ca/password') {
            cy.get('#password').type('cookeys');
            cy.get('button[type="submit"]').click();

            cy.url().should('eq', 'https://cookeys.ca/');
        } else {
            cy.url().should('eq', 'https://cookeys.ca/');
            cy.get('.header__logo').should('be.visible');
            cy.get('#top').should('be.visible');
        }
    });   
})

Cypress.Commands.add('login', () => {
    cy.visit('/');
    cy.clearCookies();
    cy.get('#password').type('cookeys');
    cy.get('button[type="submit"]').click();
    
    cy.url().should('eq', 'https://cookeys.ca/');
    cy.get('.header__logo').should('be.visible');
    cy.get('#top').should('be.visible');
          
})

import 'cypress-real-events/support';

Cypress.Commands.add('closePopup', () => {
    cy.get('.promo-pop__close').click({ force: true });
})

Cypress.Commands.add('collectionOpen', () => {
    cy.get('#Details-HeaderMenu-1')
      .realHover();
    cy.contains('.gr-mega-links__link', 'Cookies')
      .click({ force: true });
    cy.url().should('include', '/collections/cookies');
})

Cypress.Commands.add('collectionOpenCoffee', () => {
    cy.get('#Details-HeaderMenu-1')
      .realHover();
    cy.contains('.gr-mega-links__link', 'Coffee')
      .click({ force: true });
    cy.url().should('include', '/collections/coffee');
})
Cypress.Commands.add('collectionOpenMerch', () => {
  cy.get('#Details-HeaderMenu-1')
    .realHover();
  cy.contains('.gr-mega-links__link', 'Our merch')
    .click({ force: true });
  cy.url().should('include', '/collections/our-merch');
})