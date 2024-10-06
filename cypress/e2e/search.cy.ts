// cypress/e2e/Search.spec.js
const search_fetch = 'https://gtnomugolggycmbfxvql.supabase.co/rest/v1/recipe_feed?select=*';

describe('Search Component', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.intercept('GET', search_fetch).as('getRecipes');

    cy.visit('localhost:3000/search');
  });

  it('renders the greeting and search input', () => {
    cy.get('h1').contains('Encontre');
    cy.get('input[placeholder="Pesquise receitas..."]').should('be.visible');
  });

  it('displays recipes when the API returns data', () => {
    cy.wait('@getRecipes');
    cy.get('.recipe-information').should('have.length.greaterThan', 0);
  });

  it('filters recipes based on the search input', () => {
    cy.wait('@getRecipes');
    cy.get('input[placeholder="Pesquise receitas..."]').type('Bolo de cenoura');

    cy.get('.recipe-information').each(($el) => {
      cy.wrap($el).contains('Bolo de cenoura');
    });
  });

  it('clears the search input when the clear button is clicked', () => {
    cy.wait('@getRecipes');
    cy.get('input[placeholder="Pesquise receitas..."]').type('Vegano');
    cy.get('.h-6.w-6.text-gray-500.cursor-pointer').click();

    cy.get('input[placeholder="Pesquise receitas..."]').should('have.value', '');
    cy.get('.recipe-information').should('have.length.greaterThan', 0);
  });
});
