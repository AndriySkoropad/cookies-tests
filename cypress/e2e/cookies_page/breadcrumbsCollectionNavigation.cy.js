import { faker } from '@faker-js/faker';

///<reference types="cypress" />

describe('Breadcrumbs and collection navigation functionality', () => {
    let collectionNames = [/*' Сookies '*/' Gift boxes ',' Loaf cakes ',' Coffee ',' Our merch ']
    
    beforeEach(() => {
       cy.login();
       //cy.closePopup();
    });
       
    it('Breadcrumbs change corresponding the collection opened from the home page (except "All products/Gift card")', () => {
      const randomCollection = faker.helpers.arrayElement(collectionNames).trim(); 

      cy.get('#Details-HeaderMenu-1')
        .realHover()

      cy.contains('.gr-mega-links__link', randomCollection)
        .click({force:true});
      cy.get('.breadcrumb__item')
        .should('contain', randomCollection.trim())
    });

    it('Breadcrumbs change corresponding the collection opened from the home page ("All products" collection)', () => {
      cy.get('#Details-HeaderMenu-1')
        .realHover()
        .should('be.visible');
  
      cy.contains('.gr-mega-links__link', 'Shop all')
        .should('be.visible')
        .click();
      cy.get('.breadcrumb__item')
        .should('contain', 'All Products')
    });

    it('Breadcrumbs change corresponding the collection opened from the home page ("Gift card" collection)', () => {
      cy.get('#Details-HeaderMenu-1')
        .realHover()
        .should('be.visible');
    
      cy.contains('.gr-mega-links__link', 'Gift card')
        .should('be.visible')
        .click();
      cy.get('.breadcrumb__item')
        .should('contain', 'Gift card')
    });

    it('Breadcrumbs change corresponding the collection opened from the collection page', () => {
      const randomCollection = faker.helpers.arrayElement(collectionNames).trim(); 
      cy.collectionOpen();
      cy.get('body').realHover();
      cy.wait(6000)
      cy.contains('.collections-nav-link', randomCollection)
        .click()
 
      cy.get('.breadcrumb__item')
        .should('contain', randomCollection.trim())

      cy.get('.gr-collection-banner__title')
        .should('be.visible')
        .invoke('text')
        .then((text) => {
      const cleanedText = text.replace(/^\s+|\s+$/g, '').replace(/\xa0+/g, '');
        expect(cleanedText).to.eq(randomCollection.trim());
        });
    });

    it('Breadcrumbs change corresponding the collection opened from the collection page ("All products" collection)', () => {
      cy.collectionOpen();
      cy.get('body').realHover();
      cy.contains('.collections-nav-item','All Products')
        .click();
      cy.get('.breadcrumb__item')
        .should('contain', 'All Products')
      cy.get('#SortBy')
        .should('be.visible')
    });

    it('Breadcrumbs change corresponding the collection opened from the collection page ("Gift card" collection)', () => {
      cy.collectionOpen();
      cy.get('body').realHover();
      cy.contains('.collections-nav-item','Gift card')
        .click();
      cy.get('.breadcrumb__link')
        .should('contain', 'Gift card')
      cy.contains('.product-single__title','Gift card')
        .should('be.visible')
    });
});