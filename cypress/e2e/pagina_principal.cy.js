describe("Página Principal", () => {
  beforeEach(() => {
    cy.visit("https://adopet-frontend-cypress.vercel.app/");
  });

  it('Deve verificar o título da página e clicar no botão "Ver pets disponíveis para adoção"', () => {
    cy.title().should("eq", "AdoPet");
    cy.get(".button").click();
  });

  it("Deve testar o botão de home no cabeçalho e garantir o retorno à página principal", () => {
    cy.get(".header__home").click();
    cy.url().should("eq", "https://adopet-frontend-cypress.vercel.app/");
  });
});
