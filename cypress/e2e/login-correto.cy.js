describe("Página de Login", () => {
  beforeEach(() => {
    cy.visit("https://adopet-frontend-cypress.vercel.app/");
    cy.contains("a", "Fazer login").click();
  });

  it("Deve preencher os campos do formulário corretamente para fazer login", () => {
    cy.fixture("usuario").then((dados) => {
      cy.get('input[name="email"]').type(dados.email);
      cy.get('input[name="password"]').type("Senha123");
      cy.contains("button", "Entrar").click();
      cy.url().should("include", "/home");
    });
  });
});
