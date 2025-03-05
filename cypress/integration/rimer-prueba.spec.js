describe('Prueba', () => {
  it('visits example.com', () => {
    cy.visit('https://www.example.com');
    cy.title().should('include', 'Example Domain');
  });
});