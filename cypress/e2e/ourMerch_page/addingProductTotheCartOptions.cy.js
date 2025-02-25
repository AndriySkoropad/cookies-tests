import { faker } from '@faker-js/faker';

///<reference types="cypress" />

describe('Adding product with options to the cart flow', () => {
  const productNames_size= ['Classic T-Shirt']
  const productNames_color= ['Casual Unisex Cap']
  const productSizes = ['S','M','L']
  const productColors = ['Beige','Black']
    
  beforeEach(() => {
    cy.login();
    //cy.closePopup();
    cy.collectionOpenMerch();
  });
       


  it('Selecting product size and adding product to the cart', () => {

    const randomProduct = faker.helpers.arrayElement(productNames_size); 
    const randomSize = faker.helpers.arrayElement(productSizes);
    
    cy.contains('.product-card__title', randomProduct)
      .click({force: true});
    
    cy.get('.gr-product-options__swatches')
      .contains(randomSize)
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
       expect(cartText.trim()).to.include(randomSize);
      });
  });

  it('Selecting product color and adding product to the cart', () => {

    const randomProduct = faker.helpers.arrayElement(productNames_color); 
    const randomColor = faker.helpers.arrayElement(productColors);
    
    cy.contains('.product-card__title', randomProduct)
      .click({force: true});
    
    cy.get('.gr-product-options')
      .contains(randomColor)
      .click({force: true});

    cy.contains('.gr-product-form-btn__text','Add to cart').click({force: true})

    cy.get('.secondary-nav__item--cart').click()
    cy.contains('.cart__view','View cart')
      .click()

    cy.get('.gr-cart-item')
      .should('contain', randomColor)

    cy.get('.gr-cart-item__meta')
      .invoke('text')
      .then((cartText) => {
       expect(cartText.trim()).to.include(randomColor);
      });
  });
});