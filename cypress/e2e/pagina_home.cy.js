describe("Jornada do Usuário na Home", () => {
  it("Deve exibir a lista de pets após clicar no botão da Landing Page", () => {
    cy.visit("https://adopet-frontend-cypress.vercel.app/");
    cy.contains("a", "Ver pets disponíveis para adoção").click();
    cy.url().should("include", "/home");
    cy.get(".cards").should("be.visible");
  });

  describe("Elementos e Interações da Home", () => {
    beforeEach(() => {
      cy.visit("https://adopet-frontend-cypress.vercel.app/home");
    });

    it("Deve garantir que os cards de animais estão visíveis", () => {
      cy.get(".cards").should("be.visible");
    });

    it("Deve redirecionar para login ao tentar falar com o responsável sem estar logado", () => {
      cy.get(".card__contact").first().click();
      cy.contains("p", "Já tem conta? Faça seu login:").should("be.visible");
      cy.url().should("include", "/login");
    });
  });
});
