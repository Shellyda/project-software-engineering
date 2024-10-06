/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// @ts-ignore
// @ts-expect-error
describe('Recipe Page', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit('localhost:3000/home');
    cy.url().should('include', '/home');

    cy.get('.slider').first().invoke('attr', 'href').as('recipeLink');

    cy.get('.slider').first().click();
  });

  it('renders the recipe information correctly', function () {
    cy.wait(2000);
    cy.url().should('include', '/receita');

    // Parse URL params
    cy.url().then((url) => {
      const urlParams = new URLSearchParams(new URL(url).search);
      const recipeName = urlParams.get('recipe_name');
      const recipeImage = urlParams.get('recipe_image');
      const userName = urlParams.get('user_name');
      const userImage = urlParams.get('user_image');
      // const ingredients = urlParams.get('ingredients');
      // const instructions = urlParams.get('instructions');

      cy.get('h1').eq(1).invoke('text').should('equal', decodeURIComponent(recipeName));
      cy.get('p').invoke('text').should('equal', decodeURIComponent(userName));
      cy.get('img')
        .eq(1)
        .should('have.attr', 'src')
        .then((src) => {
          const srcUrlParams = new URLSearchParams(new URL(`https://dummy.com${src}`).search);
          const actualImageUrl = srcUrlParams.get('url');
          expect(decodeURIComponent(actualImageUrl)).to.equal(decodeURIComponent(recipeImage));
        });

      cy.get('img')
        .eq(0)
        .should('have.attr', 'src')
        .then((src) => {
          const srcUrlParams = new URLSearchParams(new URL(`https://dummy.com${src}`).search);
          const actualUserImageUrl = srcUrlParams.get('url');
          expect(decodeURIComponent(actualUserImageUrl)).to.equal(decodeURIComponent(userImage));
        });
    });
  });

  it('copies the recipe link to clipboard', function () {
    cy.get('svg').first().click();
    cy.url().should('include', '/receita');

    cy.url().then((url) => {
      const recipeLink = url;

      cy.window().then((win) => {
        cy.stub(win.navigator.clipboard, 'writeText').as('clipboardWrite');
      });

      cy.get('svg').first().click();
      cy.get('@clipboardWrite').should('have.been.calledWith', recipeLink);
    });
  });
});
