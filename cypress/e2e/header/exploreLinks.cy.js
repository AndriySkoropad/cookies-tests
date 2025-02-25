/// <reference types="cypress" />
 
describe('Explore links functionality', () => {

    beforeEach(() => {
      cy.login();
      //cy.closePopup();
    });
    
  it('The user can open the Our Story link from header menu', () => {
    cy.get('#Details-HeaderMenu-2')
      .realHover();
    cy.get('.list-menu')
      .should('be.visible')
    cy.contains('.list-menu__link', 'Our Story')
      .click();
    cy.url()
      .should('include', '/pages/about-us');
    cy.contains('h2', ' Who we are ').should('be.visible');
  });
  
  it('The user can open the Contacts link from header menu', () => {
    cy.get('#Details-HeaderMenu-2')
      .realHover();
    cy.get('.list-menu')
      .should('be.visible')
    cy.contains('.list-menu__link', 'Contacts')
      .click();
    cy.url().should('include', '/pages/contact');
    cy.contains('h2', ' Get in touch ').should('be.visible');
  });
  
  it('The user can open the Career link from header menu', () => {
    cy.get('#Details-HeaderMenu-2')
      .realHover();
    cy.get('.list-menu')
      .should('be.visible')
    cy.contains('.list-menu__link', 'Career')
      .click();
    cy.url().should('include', '/pages/career');
    cy.contains('h2', ' Let’s work together ').should('be.visible');
  });

  it('The user can open the Special Events link from header menu', () => {
    cy.get('#Details-HeaderMenu-2')
      .realHover();
    cy.get('.list-menu')
      .should('be.visible')
    cy.contains('.list-menu__link', 'Special Events')
      .click();
    cy.url().should('include', '/pages/special-events');
    cy.contains('h2', ' Your event — Our passion ').should('be.visible');
  });
});