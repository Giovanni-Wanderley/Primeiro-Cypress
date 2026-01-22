describe("Página de Login", () => {
  beforeEach(() => {
    cy.visit("https://adopet-frontend-cypress.vercel.app/");
    cy.get('[data-test="login-button"]').click();
  });

  it("Deve preencher os campos do formulário corretamente para fazer login", () => {
    cy.fixture("usuario").then((dados) => {
      cy.get('[data-test="input-loginEmail"]').type(dados.email);
      cy.get('[data-test="input-loginPassword"]').type("Senha123");
      cy.get('[data-test="submit-button"]').click();
      cy.contains("p", "Olá!").should("be.visible");
    });
  });
});
