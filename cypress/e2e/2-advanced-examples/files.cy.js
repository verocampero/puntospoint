/// <reference types="cypress" />

/// JSON fixture file can be loaded directly using
// the built-in JavaScript bundler
const requiredExample = require('../../fixtures/example');

context('Files', () => {
  beforeEach(function () {
    cy.visit('https://example.cypress.io/commands/files');

    // Cargar el fixture y guardarlo en el contexto
    cy.fixture('example').then((data) => {
      this.example = data;
    });
  });

  it('cy.fixture() - load a fixture', function () {
    // Intercepta la petición y responde con el fixture
    cy.intercept('GET', '**/comments/*', { fixture: 'example.json' }).as('getComment');

    // Simula una acción que dispara la petición
    cy.get('.fixture-btn').click();

    // Verifica que la respuesta contiene la propiedad esperada
    cy.wait('@getComment').its('response.body')
      .should('have.property', 'message')
      .and('include', 'Using fixtures to represent data');
  });

  it('cy.fixture() or require - load a fixture', function () {
    // Compara el fixture cargado en el contexto con el importado directamente
    expect(this.example, 'fixture in the test context').to.deep.equal(requiredExample);

    // Otra forma de hacer la misma validación
    cy.wrap(this.example).should('deep.equal', requiredExample);
  });

  it('cy.readFile() - read file contents', () => {
    // Lee el archivo de configuración de Cypress
    cy.readFile(Cypress.config('configFile')).then((config) => {
      expect(config).to.be.a('string');
    });
  });

  it('cy.writeFile() - write to a file', () => {
    // Guarda datos en un archivo JSON
    cy.request('https://jsonplaceholder.cypress.io/users')
      .then((response) => {
        cy.writeFile('cypress/fixtures/users.json', response.body);
      });

    // Verifica que el archivo se escribió correctamente
    cy.fixture('users').should((users) => {
      expect(users[0].name).to.exist;
    });

    // Escribe otro archivo de prueba
    cy.writeFile('cypress/fixtures/profile.json', {
      id: 8739,
      name: 'Jane',
      email: 'jane@example.com',
    });

    // Verifica el contenido del nuevo archivo
    cy.fixture('profile').should((profile) => {
      expect(profile.name).to.eq('Jane');
    });
  });
});
