// cypress/e2e/login.spec.ts
const login_url = 'https://gtnomugolggycmbfxvql.supabase.co/auth/v1/token?grant_type=password';

describe('Login Page', () => {
  beforeEach(() => {
    cy.viewport('iphone-6'); // Set viewport to a device smaller than 768px
    cy.visit('localhost:3000/login'); // Adjust the path to your actual login route
  });

  it('should display an error message with invalid credentials', () => {
    cy.intercept('POST', login_url, {
      statusCode: 401,
      body: { error: 'Credenciais inválidas. Por favor, tente novamente.' }
    }).as('loginRequest');

    cy.get('input[name="email"]').type('invalid@example.com'); // Type in an invalid email
    cy.get('input[name="password"]').type('wrongpassword'); // Type in an invalid password
    cy.get('button[type="submit"]').click(); // Submit the form

    cy.wait('@loginRequest');

    cy.get('.text-error') // Adjust selector for the error message
      .should('be.visible')
      .and('contain', '❗ Credenciais inválidas. Por favor, tente novamente.');
  });

  it('should redirect to home on successful login', () => {
    cy.get('input[name="email"]').type('josebasiliosilvaneto@gmail.com'); // Type in a valid email
    cy.get('input[name="password"]').type('abcde'); // Type in a valid password
    cy.get('button[type="submit"]').click(); // Submit the form

    cy.wait(2000);
    cy.url().should('include', '/home'); // Adjust the path to your home route
  });
});
