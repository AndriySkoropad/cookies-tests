/// <reference types="cypress" />
 
describe('Shop links functionality', () => {

  beforeEach(() => {
    cy.login();
    //cy.closePopup();
  });

  it('The user can open the Cookies link', () => {
    cy.get('#Details-HeaderMenu-1')
      .realHover();
    cy.get('#HeaderMenu-MenuList-1 > .nav__sub-wrap') 
      .should('be.visible');  
    cy.contains('.gr-mega-links__link', 'Cookies')
      .click({force:true});
    cy.url()
      .should('include', '/collections/cookies');
    cy.contains('h1', ' Cookies ')
      .should('be.visible');
  });
  
  it('The user can open the Gift boxes link', () => {
    cy.get('#Details-HeaderMenu-1')
      .realHover();
    cy.get('#HeaderMenu-MenuList-1 > .nav__sub-wrap') 
      .should('be.visible');  
    cy.contains('.gr-mega-links__link', 'Gift boxes')
      .click({force: true});
    cy.url()
      .should('include', '/collections/gift-boxes');
    cy.contains('h1', ' Gift boxes ')
      .should('be.visible');
  });
  
  it('The user can open the Loaf cakes link', () => {
    cy.get('#Details-HeaderMenu-1')
      .realHover();
    //cy.get('#HeaderMenu-MenuList-1 > .nav__sub-wrap') 
      //.should('be.visible');  
    cy.contains('.gr-mega-links__link', 'Loaf cakes')
      .click({force:true});
    cy.url()
      .should('include', '/collections/loaf-cakes');
    cy.contains('h1', ' Loaf cakes ')
      .should('be.visible');
  });

  it('The user can open the Coffee link', () => {
    cy.get('#Details-HeaderMenu-1')
      .realHover();
    cy.get('#HeaderMenu-MenuList-1 > .nav__sub-wrap') 
      .should('be.visible');  
    cy.contains('.gr-mega-links__link', 'Coffee')
      .click({force: true});
    cy.url()
      .should('include', '/collections/coffee');
    cy.contains('h1', ' Coffee ')
      .should('be.visible');
  });
    
  it('The user can open the Our merch link', () => {
    cy.get('#Details-HeaderMenu-1')
      .realHover();
    cy.get('#HeaderMenu-MenuList-1 > .nav__sub-wrap') 
      .should('be.visible');  
    cy.contains('.gr-mega-links__link', 'Our merch')
      .click();
    cy.url()
      .should('include', '/collections/our-merch');
    cy.contains('h1', ' Our merch ')
      .should('be.visible');
  });

  it('The user can open the Gift card link', () => {
    cy.get('#Details-HeaderMenu-1')
      .realHover();
    cy.get('#HeaderMenu-MenuList-1 > .nav__sub-wrap') 
      .should('be.visible');  
    cy.contains('.gr-mega-links__link', 'Gift card')
      .click({force: true});
    cy.url()
      .should('include', '/products/gift-card');
    cy.contains('h1', 'Gift card')
      .should('be.visible');
  });

  it('The user can open the Shop all link', () => {
    cy.get('#Details-HeaderMenu-1')
      .realHover();
    cy.get('#HeaderMenu-MenuList-1 > .nav__sub-wrap') 
      .should('be.visible');  
    cy.contains('.gr-mega-links__link', 'Shop all')
      .click({force: true});
    cy.url()
      .should('include', '/collections/all');
    cy.get('.collection__cards')
      .should('be.visible');
  });

  it('The user can see product cards when hovering over the Cookies link', () => {
    cy.get('#Details-HeaderMenu-1')
      .realHover();
    cy.contains('.gr-mega-links__link', 'Cookies')
      .realHover();
    cy.get('.gr-mega-panel')
      .should('be.visible');
  });

  it('The user can see product cards when hovering over the Gift boxes link', () => {
    cy.get('#Details-HeaderMenu-1')
      .realHover();
    cy.contains('.gr-mega-links__link', 'Gift boxes')
      .realHover();
    cy.get('.gr-mega-panel')
      .should('be.visible')
  });

  it('The user can see product cards when hovering over the Loaf cakes link', () => {
    cy.get('#Details-HeaderMenu-1')
      .realHover();
    cy.contains('.gr-mega-links__link', 'Loaf cakes')
      .realHover();
    cy.get('.gr-mega-panel')
      .should('be.visible')
  });
});