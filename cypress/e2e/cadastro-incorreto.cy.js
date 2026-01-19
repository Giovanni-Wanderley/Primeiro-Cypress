describe("Página de Cadastro", () => {
  beforeEach(() => {
    cy.visit("https://adopet-frontend-cypress.vercel.app/");
    cy.get('[data-test="register-button"]').click();
  });

  it("Deve exibir mensagens de erro ao preencher o formulário incorretamente", () => {
    cy.get('[data-test="input-name"]').type("Giovanni Wanderley");
    cy.get('[data-test="input-email"]').type("giovanni");
    cy.get('[data-test="input-password"]').type("123");
    cy.get('[data-test="input-confirm-password"]').type("123");
    cy.get('[data-test="submit-button"]').click();
    cy.contains("Por favor, verifique o email digitado").should("be.visible");
    cy.contains(
      "A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres",
    ).should("be.visible");
  });
});
