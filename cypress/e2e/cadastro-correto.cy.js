describe("Página de Cadastro", () => {
  beforeEach(() => {
    cy.visit("https://adopet-frontend-cypress.vercel.app/");
    cy.get('[data-test="register-button"]').click();
    cy.contains("p", "Ainda não tem cadastro?").should("be.visible");
  });

  it("Deve cadastrar um usuário com nome aleatório e e-mail dinâmico", () => {
    cy.fixture("massa-dados").then((massa) => {
      const nomeAleatorio =
        massa.cadastro.nomes[Math.floor(Math.random() * massa.cadastro.nomes.length)];
      const emailDinamico = `email_aleatorio${Date.now()}@email.com`;

      cy.writeFile("cypress/fixtures/usuario.json", {
        email: emailDinamico,
        nome: nomeAleatorio,
      });
      cy.cadastrar(nomeAleatorio, emailDinamico, massa.cadastro.senha);
      cy.contains("p", "Já tem conta? Faça seu login:").should("be.visible");
      cy.url().should("include", "/login");
    });
  });
});
