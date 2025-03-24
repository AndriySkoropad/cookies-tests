import { faker } from '@faker-js/faker';

///<reference types="cypress" />

describe('Adding product to the cart flow', () => {
  const productNames = ['Almond croissant','Apple pie','Biscoff Chunky cookies','Black forest','Bueno Chunky Cookies','Butterscotch pecan',
        'Coconut/Salt Caramel!!!!','Double chocolate','Dry Cherry/milk choc','Easter eggs','Ferrero Rocher'/*,'Pumpkin pie','Red velvet','Snickers Love',
        'Strawberry explosion','Tiramisu','Walnut!!!','White choco Oreo chunk Cookies'*/]
  const productPacks = ['4-pack','6-pack','12-pack']
  const greetingCards = ['greeting_card_1','greeting_card_2','greeting_card_3','greeting_card_4','greeting_card_5','greeting_card_6',
    'greeting_card_7','greeting_card_8']
    
  beforeEach(() => {
    cy.login();
    //cy.closePopup();
    cy.collectionOpen();
  });
       
  it('Adding product to the cart from the collection page', () => {
    const randomProduct = faker.helpers.arrayElement(productNames); 

    cy.contains('.product-card__title', randomProduct)
      .parents('.product-card')
      .find('.quick-shop__trigger')
      .click({force: true});

    cy.get('.quick-shop__wrapper')
      .should('be.visible')
      .and('contain', randomProduct)
    cy.contains('button','Add to cart')
      .should('be.visible')
      .click()
      
    cy.wait(1000)
      
    cy.get('.secondary-nav__item--cart').click()
    cy.contains('#drawer-cart > .c-btn--hollow','View cart')
      .click()
    cy.contains('h1','Cart')
      .should('be.visible')
    cy.get('.gr-cart-item')
      .should('contain', randomProduct)
  });

  it('Adding product to the cart from the product page', () => {

    const randomProduct = faker.helpers.arrayElement(productNames); 

    cy.contains('.product-card__title', randomProduct)
      .click({force: true});
    cy.contains('.gr-product-form-btn__text','Add to cart', randomProduct).click({force: true})

    cy.get('.secondary-nav__item--cart').click()
    cy.contains('#drawer-cart > .c-btn--hollow','View cart')
      .click()
    cy.contains('h1','Cart')
      .should('be.visible')
    cy.get('.gr-cart-item')
      .should('contain', randomProduct)
  });

  it('Adding product to the cart with greeting card', () => {

    const randomProduct = faker.helpers.arrayElement(productNames); 
    const randomCard = faker.helpers.arrayElement(greetingCards); 

    cy.contains('.product-card__title', randomProduct)
      .click({force: true});

    cy.get(`#${randomCard}`)
      .click({force: true});

    cy.contains('.gr-product-form-btn__text','Add to cart').click({force: true})

    cy.get('.secondary-nav__item--cart').click()
    cy.contains('#drawer-cart > .c-btn--hollow','View cart')
      .click()
    cy.contains('h1','Cart')
      .should('be.visible')
    cy.get('.gr-cart-item')
      .should('contain', randomProduct)
  });

  it('Deleting product from the cart', () => {
    const randomProduct = faker.helpers.arrayElement(productNames); 

    cy.contains('.product-card__title', randomProduct)
      .parents('.product-card')
      .find('.quick-shop__trigger')
      .click({force: true});

    cy.contains('button','Add to cart')
      //.should('be.visible')
      .click()
      
    cy.wait(1000)
      
    cy.get('.secondary-nav__item--cart').click()
    cy.contains('.cart__view','View cart')
      .click()
    cy.contains('h1','Cart')
      .should('be.visible')
    cy.get('.gr-cart-item')
      .should('contain', randomProduct)
    cy.get('.gr-cart-item__remove').click();
    cy.get('.cart-empty').should('be.visible');

  });

  it('Product has a correct price in the cart', () => {
    const randomProduct = faker.helpers.arrayElement(productNames); 
    let productPrice;
    let cartPrice;

    cy.contains('.product-card__title', randomProduct)
      .parents('.product-card')
      .find('.price__number .money')
      .invoke('text')
      .then((text) => {
    productPrice = parseFloat(text.replace('$', '').trim());
    });

    cy.contains('.product-card__title', randomProduct)
      .click({force: true});    
    cy.contains('.gr-product-form-btn__text','Add to cart', randomProduct) //add product to the cart
      .click({force: true})
  
    cy.get('.secondary-nav__item--cart') //redirect to the cart
      .click()
    cy.contains('.cart__view','View cart')
      .click()
    cy.contains('h1','Cart')
      .should('be.visible')

    cy.get('.gr-cart-item')
      .should('contain', randomProduct)
      .find('.money')
      .invoke('text')
      .then((text) => {
    cartPrice = parseFloat(text.replace('$', '').trim()); 
      expect(productPrice).to.equal(cartPrice); 
    });
  });

  it('Product price has a correct price in the sidecart', () => {
    const randomProduct = faker.helpers.arrayElement(productNames); 
    let productPrice;
    let sideCartPrice;
    
    cy.contains('.product-card__title', randomProduct)
      .parents('.product-card')
      .find('.price__number .money')
      .invoke('text')
      .then((text) => {
    productPrice = parseFloat(text.replace('$', '').trim());
    });

    cy.contains('.product-card__title', randomProduct)
      .click({force: true});    
    cy.contains('.gr-product-form-btn__text','Add to cart', randomProduct) //add product to the cart
      .click({force: true})
    
    cy.get('.secondary-nav__item--cart')
      .click()

    cy.get('#drawer-cart')
      .should('contain', randomProduct)
      .find('.money')
      .invoke('text')
      .then((text) => {
    sideCartPrice = parseFloat(text.replace('$', '').trim()); 
    expect(productPrice).to.equal(sideCartPrice); 
    });
  });

  it('Product has a correct amount in the cart', () => {
    const randomProduct = faker.helpers.arrayElement(productNames); 
    const randomPack = faker.helpers.arrayElement(productPacks); 
    let cartPack;

    cy.contains('.product-card__title', randomProduct)
      .click({force: true}); 
    cy.contains('.gr-swatch__count', randomPack)
      .click({ force: true });
      
    cy.contains('.gr-product-form-btn__text','Add to cart') //add product to the cart
      .click({force: true})
    
    cy.get('.secondary-nav__item--cart')
      .click()
    cy.contains('.cart__view','View cart')
      .click()

    cy.get('.gr-cart-item')
      .should('contain', randomProduct)
      .find('.gr-cart-item__meta')
      .invoke('text')
      .then((text) => {
    cartPack = text.match(/(\d+)-pack/)[0]; 
    expect(cartPack).to.equal(randomPack); 
    });
  });

  it('Product amount can be increased', () => {
    const randomProduct = faker.helpers.arrayElement(productNames);
    let quantityBefore;
    let quantityAfter;
    // Navigate to product page and click on the product
    cy.contains('.product-card__title', randomProduct).click({ force: true });
      
    // Capture the initial quantity value
    cy.get('.product-form__qty-input')
      .find('[name="quantity"]')
      .invoke('val')
      .then((initialQuantity) => {
    cy.log(initialQuantity)
    quantityBefore = Number(initialQuantity)

    // Click the plus button to increase quantity
    cy.get('.product-form__qty-input')
      .find('[aria-label="Increase item quantity by one"]').last()
      .click({force: true});
    cy.wait(5000)
        
    cy.contains('.gr-product-form-btn__text','Add to cart', randomProduct) //add product to the cart
      .click({force: true})
    //cy.get('.secondary-nav__item--cart')
    cy.get('#drawer-cart > .c-btn--hollow')
      .click({force: true})
  
    // Capture the updated quantity value
    cy.get('.gr-cart-item__qty').last()
      .find('[type="number"]')
      .invoke('val')
      .then((newQuantity) => {
    quantityAfter = Number(newQuantity);
    expect(quantityAfter).to.equal(quantityBefore + 1); // Verify if quantity increased by 1
    });
   });
  });

  it('Product amunt can be decreased', () => {
    const randomProduct = faker.helpers.arrayElement(productNames);
    let quantityBefore;
    let quantityAfter;
    // Navigate to product page and click on the product
    cy.contains('.product-card__title', randomProduct).click({ force: true });
      
    // Capture the initial quantity value
    cy.get('.product-form__qty-input')
      .find('[name="quantity"]')
      .invoke('val')
      .then((initialQuantity) => {
    cy.log(initialQuantity)
    quantityBefore = Number(initialQuantity)

    // Click the plus button to increase quantity
    cy.get('.product-form__qty-input')
      .find('[aria-label="Increase item quantity by one"]').last()
      .click({force: true})
      .click({force: true});

    cy.wait(5000)
        
    cy.contains('.gr-product-form-btn__text','Add to cart', randomProduct) //add product to the cart
      .click({force: true})
    //cy.get('.secondary-nav__item--cart')
    cy.get('#drawer-cart > .c-btn--hollow')
      .click({force: true})
  
    // Capture the updated quantity value
    cy.get('.gr-cart-item__qty').last()
      .find('[type="number"]')
      .invoke('val')
      .then((newQuantity) => {
    quantityAfter = Number(newQuantity);
    expect(quantityAfter).to.equal(quantityBefore + 2); // Verify if quantity increased by 1
    });

    //reduce product quantity on the cart page
    cy.get('.gr-cart-item__qty')
      .find('[name="updates[]"]')
      .invoke('val')
      .then((initialQuantity) => {
    cy.log(initialQuantity)
    quantityBefore = Number(initialQuantity)
    });

   cy.get('.gr-cart-item__qty')
     .find('[aria-label="Reduce item quantity by one"]').last()
     .click({force: true})
    });

    cy.get('.gr-cart-item__qty').last()
      .find('[type="number"]')
      .invoke('val')
      .then((newQuantity) => {
    quantityAfter = Number(newQuantity);
    expect(quantityAfter).to.equal(quantityBefore - 1); // Verify if quantity decreased by 1
    });
  });

  it('User is redirected to checkout page', () => {
    const randomProduct = faker.helpers.arrayElement(productNames);
    
    cy.contains('.product-card__title', randomProduct)
      .parents('.product-card')
      .find('.quick-shop__trigger')
      .click({force: true});

    cy.wait(1000)

    cy.contains('button','Add to cart')
      .should('be.visible')
      .click();
      
    cy.get('.secondary-nav__item--cart')
      .click({force: true})
    cy.contains('.cart__view','View cart')
      .click({force: true});
    cy.contains('h1','Cart')
      .should('be.visible');
    cy.get('.gr-cart-item')
      .should('contain', randomProduct);

    cy.get('.cart__checkout')
      .click()
    cy.contains('._1tx8jg70', randomProduct)//product title
      .should('be.visible');
    cy.contains('._1qy6ue6b', 'Subtotal') //product price
      .should('be.visible');
    cy.contains('h2','Delivery') //shipping address
      .should('be.visible');
    cy.contains('h2','Contact')
      .should('be.visible')//contact section
    cy.contains('h2','Payment')
      .should('be.visible')//payment section
    cy.get('#checkout-pay-button').should('be.visible');
  });

  it('Product has a correct price on the checkout page', () => {
    const randomProduct = faker.helpers.arrayElement(productNames); 
    let productPrice;
    let checkoutPrice;

    cy.contains('.product-card__title', randomProduct)
      .parents('.product-card')
      .find('.price__number .money')
      .invoke('text')
      .then((text) => {
    productPrice = parseFloat(text.replace('$', '').trim());
    });

    cy.contains('.product-card__title', randomProduct)
      .click({force: true});    
    cy.contains('.gr-product-form-btn__text','Add to cart', randomProduct) //add product to the cart
      .click({force: true})
  
    cy.get('.secondary-nav__item--cart') //redirect to the cart
      .click()
    cy.contains('.cart__view','View cart')
      .click()
    cy.contains('h1','Cart')
      .should('be.visible')

    cy.get('.cart__checkout')//redirect to checkout
      .click()
    cy.get('._1fragem1y')//product title
      .should('contain', randomProduct)
      .find(':nth-child(1) > ._1qy6ue6c > ._19gi7yt0')
      .invoke('text')
      .then((text) => {
    checkoutPrice = parseFloat(text.replace('$', '').trim()); 
      expect(productPrice).to.equal(checkoutPrice); 
    });
  });
});