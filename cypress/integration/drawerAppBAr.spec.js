describe('DrawerAppBar Component', () => {
  
    beforeEach(() => {
      
        cy.visit('http://localhost:3000/'); // Esto debería funcionar
    });
  
    it('should render the AppBar correctly', () => {
      // Verifica que la AppBar se está renderizando correctamente
      cy.get('header').should('exist');
      cy.contains('Dashboard').should('exist');
      cy.contains('Clientes').should('exist');
      cy.contains('Reglas de Acumulación').should('exist');
    });
  
    it('should highlight the active navigation item', () => {
      // Verifica que el ítem de navegación activo se resalte
      cy.contains('Dashboard').click();
      cy.get('button').contains('Dashboard')
        .should('have.css', 'background-color', 'rgb(100, 75, 186)'); // Verifica que el color de fondo es el correcto
    });
  
    it('should open and close the drawer on mobile', () => {
      // Simula que estamos en un dispositivo móvil
      cy.viewport('iphone-6'); // Esto cambia el tamaño de la ventana para simular un móvil
  
      // Verifica que el drawer esté cerrado inicialmente
      cy.get('.MuiDrawer-paper').should('not.be.visible');
  
      // Haz clic en el botón de menú
      cy.get('.MuiIconButton-root').click();
  
      // Verifica que el drawer se haya abierto
      cy.get('.MuiDrawer-paper').should('be.visible');
  
      // Haz clic en el botón de menú para cerrarlo
      cy.get('.MuiIconButton-root').click();
  
      // Verifica que el drawer se haya cerrado
      cy.get('.MuiDrawer-paper').should('not.be.visible');
    });
  
    it('should navigate between pages when a menu item is clicked', () => {
      // Simula la navegación entre los elementos del menú
      cy.contains('Dashboard').click();
    //   cy.url().should('include', '/'); // Ajusta esta URL según la navegación de tu app
  
      cy.contains('Clientes').click();
    //   cy.url().should('include', '/clientes'); // Ajusta esta URL según la navegación de tu app
    });
  });
  