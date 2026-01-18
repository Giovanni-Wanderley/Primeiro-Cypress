describe('Página Home', () => {
  it('Deve acessar a página home e página de "Falar com o responsável"', () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/home');
    cy.get('.header__message').click() 
  });
});
