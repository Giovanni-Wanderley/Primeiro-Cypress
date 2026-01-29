describe("Página de Cadastro", () => {
  beforeEach(() => {
    cy.visit("https://adopet-frontend-cypress.vercel.app/");
    cy.get('[data-test="register-button"]').click();
    cy.contains("p", "Ainda não tem cadastro?").should("be.visible");
  });

  it("Preencher os campos do formulário corretamente para cadastrar um novo usuário", () => {
    const emailDinamico = `giovanni${Date.now()}@email.com`;
    const senhaPadrao = "Senha123";

    cy.writeFile("cypress/fixtures/usuario.json", { email: emailDinamico });
    cy.cadastrar("Giovanni Wanderley", emailDinamico, senhaPadrao);
    cy.contains("p", "Já tem conta? Faça seu login:").should("be.visible");
    cy.url().should("include", "/login");
  });
});
