/// <reference types="cypress" />
 
describe('Follow us links functionality', () => {

    beforeEach(() => {
      cy.login();
      //cy.closePopup();
    });
    
    it('The user can open the Cookies link', () => {
      cy.contains('.footer-nav__link', 'Cookies')
        .click();    
      cy.url().should('include', '/collections/cookies');
      cy.contains('h1', ' Cookies ').should('be.visible');
    });
  
    it('The user can open the Gift boxes link', () => {
      cy.contains('.footer-nav__link', 'Gift boxes')
        .click();
      cy.url().should('include', '/collections/gift-boxes');
      cy.contains('h1', ' Gift boxes ').should('be.visible');
    });
  
    it('The user can open the Loaf cakes link', () => {
      cy.contains('.footer-nav__link', 'Loaf cakes')
        .click();
      cy.url().should('include', '/collections/loaf-cakes');
      cy.contains('h1', ' Loaf cakes ').should('be.visible');
    });

    it('The user can open the Coffee link', () => {
      cy.contains('.footer-nav__link', 'Coffee')
        .click();
      cy.url().should('include', '/collections/coffee');
      cy.contains('h1', ' Coffee ').should('be.visible');
    });
    
    it('The user can open the Our merch link', () => {
      cy.contains('.footer-nav__link', 'Our merch')
        .click();
      cy.url().should('include', '/collections/our-merch');
      cy.contains('h1', ' Our merch ').should('be.visible');
    });

    it('The user can see the correct footer copyright', () => {
      const currentYear = new Date().getFullYear();
      cy.get('.footer-copyright__text')
        .should('contain.text',`© ${currentYear} Cookeys.`)
        .and('contain.text', 'All Rights Reserved.');
    });
  });