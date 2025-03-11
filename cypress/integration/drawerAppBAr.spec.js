describe('DrawerAppBar Component', () => {
  
    // beforeEach(() => {
      
    //     cy.visit('http://localhost:3000/'); // Esto debería funcionar
    // });
  
    it('should render the AppBar correctly', () => {
      cy.get('header').should('exist');
      cy.contains('Dashboard').should('exist');
      cy.contains('Clientes').should('exist');
      cy.contains('Reglas de Acumulación').should('exist');
    });
  
    it('should highlight the active navigation item', () => {
      cy.contains('Dashboard').click();
      cy.get('button').contains('Dashboard')
        .should('have.css', 'background-color', 'rgb(100, 75, 186)'); 
    });
  
    it('should open and close the drawer on mobile', () => {
      cy.viewport('iphone-6'); 
  
      cy.get('.MuiDrawer-paper').should('not.be.visible');
  
      cy.get('.MuiIconButton-root').click();
  
      cy.get('.MuiDrawer-paper').should('be.visible');
  
      cy.get('.MuiIconButton-root').click();
  
      cy.get('.MuiDrawer-paper').should('not.be.visible');
    });
  
    it('should navigate between pages when a menu item is clicked', () => {
      cy.contains('Dashboard').click();
  
      cy.contains('Clientes').click();
    });
  });
  