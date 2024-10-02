/// <reference types="cypress" />
const api_fetch = 'https://gtnomugolggycmbfxvql.supabase.co/rest/v1/recipe_feed?select=*';

describe('HomePage', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.viewport('iphone-6');
    cy.visit('localhost:3000/home');
  });

  //   it('displays the greeting and user image when authenticated', () => {
  //     // Mock the authenticated user
  //     cy.intercept('GET', '/api/auth/session', {
  //       fixture: 'session.json' // Assuming you have a session.json fixture
  //     }).as('getSession');

  //     // Wait for the session to load
  //     cy.wait('@getSession');

  //     // Check if the greeting is displayed
  //     cy.contains('Olá, Chef').should('be.visible');

  //     // Check if user image is displayed (use the expected image URL)
  //     cy.get('img').should('have.attr', 'src', 'https://your.expected.image.url');
  //   });

  it('renders recipe cards', () => {
    // Mock the recipe data
    cy.intercept('GET', api_fetch).as('getRecipes');

    // Wait for the recipes to load
    cy.wait('@getRecipes');

    // Check if recipe cards are rendered
    cy.get('.slider') // Use the correct selector for the recipe card
      .should('have.length.greaterThan', 0); // Ensure that there are recipe cards
  });

  it('renders suggested recipe cards', () => {
    // Mock the recipe data
    cy.intercept('GET', api_fetch).as('getRecipes');

    // Wait for the recipes to load
    cy.wait('@getRecipes');

    // Check if recipe cards are rendered
    cy.get('.suggested') // Use the correct selector for the recipe card
      .should('have.length.greaterThan', 0); // Ensure that there are recipe cards
  });

  it('navigates to the recipe details page when a recipe card is clicked', () => {
    cy.intercept('GET', api_fetch).as('getRecipes');

    // Wait for the recipes to load
    cy.wait('@getRecipes');

    // Click on the first recipe card
    cy.get('.slider').first().click();

    cy.wait(5000);
    cy.url().should('match', /\/receita\/\d+/);
  });
});
