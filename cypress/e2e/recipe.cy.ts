describe('Recipe Page', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit('localhost:3000/home');
    cy.url().should('include', '/home');
    cy.get('.slider').first().click();
  });

  it('renders the recipe information correctly', () => {
    cy.get('h1').contains('Panqueca Americana'); // Replace 'Recipe Title' with the expected title from your fixture
    cy.get('p').contains('mapamundi'); // Replace 'User Name' with the expected user name from your fixture
    cy.get('textarea').should('have.length', 2); // Check for the ingredients and instructions text areas
    cy.get('textarea').first().should('have.value', 'Ingredient 1, Ingredient 2'); // Replace with your expected ingredients
    cy.get('textarea').last().should('have.value', 'Step 1. Step 2.'); // Replace with your expected instructions
    cy.get('img').should('have.attr', 'src', 'https://example.com/recipe_image.jpg'); // Replace with expected image URL
  });

  it('copies the recipe link to clipboard', () => {
    cy.get('svg').first().click(); // Click the share icon
    cy.window().then((win) => {
      cy.stub(win.navigator.clipboard, 'writeText').as('clipboardWrite');
    });
    cy.get('svg').first().click(); // Click the share icon again to copy the link
    cy.get('@clipboardWrite').should('be.calledWith', 'https://your-app-url.com/recipe/1'); // Replace with actual URL
  });
});
