describe('Pets Disponíveis', () => {
  it('Deve exibir a lista de pets disponíveis após clicar no botão ‘Ver pets disponíveis para adoção”', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/');
    cy.contains('a', 'Ver pets disponíveis para adoção').click();
  });

});
