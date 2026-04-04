describe("Pagina de Login", () => {
  beforeEach(() => {
    cy.visit("https://adopet-frontend-cypress.vercel.app/");
    cy.get('[data-test="login-button"]').click();
  });

  it("Deve preencher os campos do formulario corretamente para fazer login", () => {
    cy.fixture("usuario").then((usuario) => {
      cy.login(usuario.email, usuario.senha);
      cy.url({ timeout: 20000 }).should("not.include", "/login");
      cy.contains(/Ol/i, { timeout: 20000 }).should("be.visible");
    });
  });
});
