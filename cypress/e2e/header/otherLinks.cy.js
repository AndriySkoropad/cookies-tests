//header menu, cart, user account, store location, logo, anouncements bar, create own box

/// <reference types="cypress" />
 
describe('Explore links functionality', () => {

    beforeEach(() => {
      cy.login();
      //cy.closePopup();
    });
    
  it('The user can open the Create own box page', () => {
    cy.contains('.primary-nav__link', 'Create own box')
      .click();
    cy.url().should('include', '/pages/choose-box');
    cy.contains('h2', 'Select number of cookies').should('be.visible');
  });

  it('The user can open the Store Location page', () => {
    cy.contains('.primary-nav__link', 'Store Location')
      .click();
    cy.url().should('include', '/pages/location');
    cy.contains('h1', ' Visit us ').should('be.visible');
  });

  it('The anouncements bar is available after opening the website', () => {
    cy.get('.announcement__message')
      .should('be.visible')
      .and('contain.text', 'Store updates and announcements');
  });

  it('The anouncements bar can be closed after opening the website', () => {
    cy.get('.announcement__close').click();
    cy.get('.announcement__message').should('not.be.visible');
  });

  it('The user is redirected to the login page after clicking the account icon', () => {
    cy.get('.secondary-nav__link')
      .should('have.attr', 'href')
      .and('include', 'https://shopify.com/')
  });

  it('The user is able to open/close the sidecart', () => {
    cy.get('.secondary-nav__item--cart').click()
    cy.get('.cart-draw__wrapper')
      .should('be.visible')
    cy.get('.gr-cart-draw__button').click();
    cy.get('.cart-draw__wrapper')
      .should('not.be.visible');
  });

  it('The opened sidecart is empty and has all elements inside', () => {
    cy.get('.secondary-nav__item--cart').click()
    cy.get('.cart-empty')
      .should('be.visible');
    cy.get('.gr-cart-empty__title')
      .should('be.visible');
    cy.contains('.c-btn--primary','Shop now')
      .should('be.visible');
  });

  it('The Shop now button in the sidecart redirects to the shop home page', () => {
    cy.get('.secondary-nav__item--cart').click()
    cy.contains('.c-btn--primary','Shop now')
      .should('be.visible')
      .click();
    cy.get('.cart-draw__wrapper')
      .should('not.be.visible');
    cy.url().should('include','https://cookeys.ca/')
  });
});