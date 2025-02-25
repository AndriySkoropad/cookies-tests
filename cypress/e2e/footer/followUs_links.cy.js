/// <reference types="cypress" />

  describe('Follow us links functionality', () => {

    beforeEach(() => {
      cy.login();
      //cy.closePopup();
    });

    it('The user can open the Instagram', () => {
      const instagramUrl = 'http://instagram.com/shopify';
      cy.get(':nth-child(1) > .social-links__link')
        .invoke('attr', 'href')
        .should('contain', instagramUrl)
      cy.get('.icon--instagram')
        .should('not.be.disabled');
    });

    it('The user can open the Facebook', () => {
      const facebookUrl = 'https://facebook.com/shopify';
      cy.get(':nth-child(2) > .social-links__link')
        .invoke('attr', 'href')
        .should('contain', facebookUrl)
      cy.get('.icon--facebook')
        .should('not.be.disabled');
    });

    it('The user can open the X', () => {
      const xUrl = 'https://x.com/shopify';
      cy.get(':nth-child(3) > .social-links__link')
        .invoke('attr', 'href')
        .should('contain', xUrl)
      cy.get('.icon--x')
        .should('not.be.disabled');
    });

    it('The user can open the Pinterest link', () => {
      const pinterestUrl = 'https://pinterest.com/shopify';
      cy.get(':nth-child(4) > .social-links__link')
        .invoke('attr', 'href')
        .should('contain', pinterestUrl)
      cy.get('.icon--pinterest')
        .should('not.be.disabled');

    });

    it('The user can open the Privacy Policy', () => {
      const termsUrl = Cypress.config('baseUrl') + '/policies/privacy-policy';
      cy.get('a[href="/policies/privacy-policy"]')
        .invoke('removeAttr', 'target') 
        .click();
      cy.url().should('eq', termsUrl);
      cy.contains('h1', 'Privacy policy').should('be.visible');
    });

    it('The user can open the Terms & Conditions', () => {
      const termsUrl = Cypress.config('baseUrl') + '/policies/terms-of-service';
      cy.get('a[href="/policies/terms-of-service"]')
        .invoke('removeAttr', 'target') 
        .click();
      cy.url().should('eq', termsUrl);
      cy.contains('h1', 'Terms of service').should('be.visible');
    });
});