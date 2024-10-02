/// <reference types="cypress" />
const api_fetch = 'https://gtnomugolggycmbfxvql.supabase.co/rest/v1/recipe_feed?select=*';

describe('HomePage', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.viewport('iphone-6');
    cy.visit('localhost:3000/home');
  });

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
