describe("Página de Login", () => {
  beforeEach(() => {
    cy.visit("https://adopet-frontend-cypress.vercel.app/");
    cy.get('[data-test="login-button"]').click();
  });

  it("Deve preencher os campos do formulário corretamente para fazer login", () => {
    cy.fixture("usuario").then((dados) => {
      cy.login(dados.email, "Senha123");
      cy.contains("p", "Olá!").should("be.visible");
    });
  });
});
