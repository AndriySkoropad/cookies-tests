/// <reference types="cypress" />
 
describe('Help links functionality', () => {

  beforeEach(() => {
    cy.login();
    //cy.closePopup();
  });
  
  it('The user can open the About us link', () => {
    cy.contains('.footer-nav__link','About Us')
      .click();    
    cy.url().should('include', '/pages/about-us');
    cy.contains('h2', ' Who we are ').should('be.visible');
  });

  it('The user can open the Special Events link', () => { //the url should be updated in future
    cy.contains('.footer-nav__link','Special Events')
      .click();
    cy.url()
      .should('include', '/pages/special-events');
    cy.contains('h2', ' Your event — Our passion ')
      .should('be.visible');
  });

  it('The user can open the Career link', () => {
    cy.contains('.footer-nav__link','Career')
      .click();
    cy.url().should('include', '/pages/career');
    cy.contains('h2', ' Our workplace culture ')
      .should('be.visible');
  });
});