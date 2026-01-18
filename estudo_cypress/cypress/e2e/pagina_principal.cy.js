describe('Deve retornar a página principal', () => {

  it("Visita a página principal do AdoPet e testa o botão de home", () => {
    cy.visit('https://adopet-frontend-cypress.vercel.app/');
    cy.get('.header__home').click()
    cy.url().should('eq', 'https://adopet-frontend-cypress.vercel.app/');
  })
})