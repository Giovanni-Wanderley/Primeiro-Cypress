describe("Página de Cadastro", () => {
  it("Preencher os campos do formulário corretamente para cadastrar um novo usuário", () => {
    const emailDinamico = `giovanni${Date.now()}@email.com`;

    cy.visit("https://adopet-frontend-cypress.vercel.app/");
    cy.get('[data-test="register-button"]').click();
    cy.get('[data-test="input-name"]').type("Giovanni Wanderley");
    cy.get('[data-test="input-email"]').type(emailDinamico);
    cy.get('[data-test="input-password"]').type("Senha123");
    cy.get('[data-test="input-confirm-password"]').type("Senha123");

    cy.writeFile("cypress/fixtures/usuario.json", { email: emailDinamico });

    cy.get('[data-test="submit-button"]').click();
  });
});
