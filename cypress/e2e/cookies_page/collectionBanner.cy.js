//banner, product cards, pagination

/// <reference types="cypress" />
 
describe('Collection banner, product cards and pagination functionality', () => {

 beforeEach(() => {
    cy.login();
    //cy.closePopup();
    cy.collectionOpen();
    });
    
    it('The collection banner title/description is available', () => {
      cy.get('.gr-heading-2')
        .should('be.visible');
      cy.get('.gr-collection-banner__description')
        .should('be.visible');
    });

    it('The product cards with all the elements are available', () => {
      cy.get('.collection__cards')
        .should('be.visible');
      cy.get('.quick-shop__trigger')
        .should('not.be.disabled');
      cy.get('.product-card__title')
        .should('be.visible');
      cy.get('.price')
        .should('be.visible');
      cy.get('.gr-product-tag-item')
        .should('be.visible');
      cy.get('.gr-product-tag a')
        .should('be.visible')
        .and('have.attr','href')
        .and('not.be.empty');
    });
    
    it('The user is able to switch between the collection pages', () => {
      cy.get('body').realHover();
      cy.get('.collection-pagination')
        .scrollIntoView()
        .should('be.visible');
      cy.get('.pagination .page.current')
        .should('be.visible')
        .and('contain', '1')
       
      cy.get('.next > a')
        .scrollIntoView()
        .should('be.visible')
        .click({ force: true });
        
      cy.get('.prev > a')
        .should('be.visible')
      cy.get('.pagination .page.current')
        .should('be.visible')
        .and('not.contain', '1')
    });

});