describe("Pagina de Cadastro", () => {
  beforeEach(() => {
    cy.visit("https://adopet-frontend-cypress.vercel.app/");
    cy.get('[data-test="register-button"]').click();
    cy.contains("p", "Ainda").should("be.visible");
  });

  it("Deve cadastrar um usuario com nome aleatorio e e-mail dinamico", () => {
    cy.fixture("massa-dados").then((massa) => {
      const nomeAleatorio =
        massa.cadastro.nomes[Math.floor(Math.random() * massa.cadastro.nomes.length)];
      const emailDinamico = `email_aleatorio${Date.now()}@email.com`;

      cy.writeFile("cypress/fixtures/usuario.json", {
        email: emailDinamico,
        nome: nomeAleatorio,
        senha: massa.cadastro.senha,
      });

      cy.cadastrar(nomeAleatorio, emailDinamico, massa.cadastro.senha);
      cy.url({ timeout: 20000 }).should("include", "/login");
      cy.get('[data-test="input-loginEmail"]', { timeout: 20000 }).should("be.visible");
    });
  });
});
