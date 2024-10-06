// cypress/e2e/login.spec.ts
const login_url = 'https://gtnomugolggycmbfxvql.supabase.co/auth/v1/token?grant_type=password';

describe('Login Page', () => {
  beforeEach(() => {
    cy.viewport('iphone-6');
    cy.visit('localhost:3000/login');
  });

  it('should display an error message with invalid credentials', () => {
    cy.intercept('POST', login_url, {
      statusCode: 401,
      body: { error: 'Credenciais inválidas. Por favor, tente novamente.' }
    }).as('loginRequest');

    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest');

    cy.get('.text-error')
      .should('be.visible')
      .and('contain', '❗ Credenciais inválidas. Por favor, tente novamente.');
  });

  it('should redirect to home on successful login', () => {
    cy.get('input[name="email"]').type('jbsn3@cin.ufpe.br');
    cy.get('input[name="password"]').type('Basi@123');
    cy.get('button[type="submit"]').click();

    cy.wait(2000);
    cy.url().should('include', '/home');
  });
});
