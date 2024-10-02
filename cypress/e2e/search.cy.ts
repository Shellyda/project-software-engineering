// cypress/e2e/Search.spec.js
const search_fetch = 'https://gtnomugolggycmbfxvql.supabase.co/rest/v1/recipe_feed?select=*';

describe('Search Component', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.intercept('GET', search_fetch).as('getRecipes');

    // Visit the page containing the Search component
    cy.visit('localhost:3000/search'); // Adjust the URL to where your Search component is rendered
  });

  it('renders the greeting and search input', () => {
    cy.get('h1').contains('Encontre'); // Check if the greeting title is rendered
    cy.get('input[placeholder="Pesquise receitas..."]').should('be.visible'); // Check if the search input is visible
  });

  it('displays recipes when the API returns data', () => {
    cy.wait('@getRecipes'); // Wait for the recipes to load
    cy.get('.recipe-information').should('have.length.greaterThan', 0); // Check that at least one recipe is rendered
  });

  it('filters recipes based on the search input', () => {
    cy.wait('@getRecipes'); // Wait for the recipes to load
    cy.get('input[placeholder="Pesquise receitas..."]').type('Panqueca'); // Simulate typing in the search input

    // Check if the filtered recipes are displayed
    cy.get('.recipe-information').each(($el) => {
      cy.wrap($el).contains('Panqueca'); // Ensure each displayed recipe contains 'Vegano'
    });
  });

  it('clears the search input when the clear button is clicked', () => {
    cy.wait('@getRecipes'); // Wait for the recipes to load
    cy.get('input[placeholder="Pesquise receitas..."]').type('Vegano'); // Simulate typing in the search input
    cy.get('.h-6.w-6.text-gray-500.cursor-pointer').click(); // Click the clear button (X icon)

    // Verify the search input is cleared
    cy.get('input[placeholder="Pesquise receitas..."]').should('have.value', '');
    cy.get('.recipe-information').should('have.length.greaterThan', 0); // Ensure recipes are still displayed
  });
});
