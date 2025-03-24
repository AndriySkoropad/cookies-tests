import { faker } from '@faker-js/faker';

///<reference types="cypress" />

describe('Adding product with options to the cart flow', () => {
  const productNames = ['Arabica Coffee Beans Ethiopia']
  const productPacks = ['250g','1kg']
    
  beforeEach(() => {
    cy.login();
    //cy.closePopup();
    cy.collectionOpenCoffee();
  });
       
  it('Selecting product options and adding product to the cart', () => {

    const randomProduct = faker.helpers.arrayElement(productNames); 
    const randomPack = faker.helpers.arrayElement(productPacks);
    
    cy.contains('.product-card__title', randomProduct)
      .click({force: true});
    
    cy.get('.gr-swatch--button')
      .contains(randomPack)
      .click({force: true});

    cy.contains('.gr-product-form-btn__text','Add to cart').click({force: true})

    cy.get('.secondary-nav__item--cart').click()
    cy.contains('.cart__view','View cart')
      .click()

    cy.get('.gr-cart-item')
      .should('contain', randomProduct)

    cy.get('.gr-cart-item__meta')
      .invoke('text')
      .then((cartText) => {
       expect(cartText.trim()).to.include(randomPack);
      });

  });
});