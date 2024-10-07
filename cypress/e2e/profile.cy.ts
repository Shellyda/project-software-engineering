describe('Profile Page E2E Test', () => {
  beforeEach(() => {
    // cy.login();
    cy.viewport('iphone-6');
    cy.visit('localhost:3000/profile?user_id=a57844b9-d830-499a-b33c-f4d104a5f118');
  });

  it('displays user profile details correctly', () => {
    cy.get('.profile-header').within(() => {
      cy.contains('José').should('exist');
      cy.contains('jbsn3@cin.ufpe.br').should('exist');
      cy.get('img')
        .should('have.attr', 'src')
        .and(
          'include',
          '/_next/image?url=https%3A%2F%2Fgtnomugolggycmbfxvql.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fbucket%25201%2Fprofile%2520picture%2Fa57844b9-d830-499a-b33c-f4d104a5f118-081979d5-9f41-4665-8a70-6ca19952410e.jpeg&w=256&q=75'
        );
    });
  });

  it('switches between "Seu feed" and "Reviews" tabs', () => {
    cy.wait(1000);
    cy.get('[data-testid="tab-seu-feed"]').should('have.attr', 'aria-selected', 'true');
    cy.get('[data-testid="recipe-information"]').should('exist');

    // cy.get('[data-testid="tab-reviews"]').click();
    // cy.get('[data-testid="tab-reviews"]').should('have.attr', 'aria-selected', 'true');

    // cy.get('[data-testid="suggested-receipe"]').should('exist');
  });

  // it('renders reviews correctly', () => {
  //   cy.get('[data-testid="tab-reviews"]').click();
  //   cy.get('[data-testid="suggested-receipe"]').should('have.length.greaterThan', 0);
  // });

  it('navigates to recipe details when a recipe is clicked', () => {
    cy.get('[data-testid="recipe-information"]').first().click();

    cy.url().should('include', '/receita');
  });

  //   it('renders reviews correctly', () => {
  //     cy.get('[data-testid="tab-reviews"]').click();
  //     cy.get('[data-testid="suggested-receipe"]').should('have.length.greaterThan', 0);
  //   });
});
