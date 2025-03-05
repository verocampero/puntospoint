// cypress/integration/primer-prueba.spec.js
describe('Mi primera prueba en Cypress', () => {
    it('Visita una página web y verifica el título', () => {
      cy.visit('https://www.example.com');
      cy.title().should('include', 'Example Domain');
    });
  });
  