describe('Login Form Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should login successfully with valid credentials and show success page', () => {
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('Test1234!');
    cy.get('#terms').check();
    cy.get('[data-cy="submit-btn"]').should('not.be.disabled');
    cy.get('[data-cy="submit-btn"]').click();
    cy.get('[data-cy="success-header"]').should('be.visible').and('contain', 'Login Successful!');
  });

  it('should show 1 error message and disable button for invalid email', () => {
    cy.get('#email').type('invalidemail');
    cy.get('#password').type('Test1234!');
    cy.get('#terms').check();
    cy.get('[data-cy="error"]').should('have.length', 1);
    cy.get('[data-cy="error"]').should('contain', 'Please enter a valid email address');
    cy.get('[data-cy="submit-btn"]').should('be.disabled');
  });

  it('should show 2 error messages for invalid email and password', () => {
    cy.get('#email').type('invalidemail');
    cy.get('#password').type('weak');
    cy.get('[data-cy="error"]').should('have.length', 2);
    cy.get('[data-cy="error"]').eq(1).should('contain', 'Password must contain');
  });

  it('should keep button disabled when terms are not accepted', () => {
    cy.get('#email').type('test@example.com');
    cy.get('#password').type('Test1234!');
    // terms checkbox is NOT checked
    cy.get('[data-cy="submit-btn"]').should('be.disabled');
  });
});
