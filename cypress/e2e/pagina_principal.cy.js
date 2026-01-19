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

  it('Deve verificar se o texto "Quem ama adota!" está presente no html', () => {
    cy.contains("Quem ama adota!").should("be.visible");
  });

  it("Deve verificar se o texto explicativo sobre adoção está presente no html", () => {
    cy.contains(
      "Adotar pode mudar uma vida. Que tal buscar seu novo melhor amigo hoje? Vem com a gente!",
    ).should("be.visible");
  });
});
