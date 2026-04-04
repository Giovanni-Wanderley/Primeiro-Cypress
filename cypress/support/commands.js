Cypress.Commands.add("login", (email, senha) => {
  cy.get('[data-test="input-loginEmail"]').type(email);
  cy.get('[data-test="input-loginPassword"]').type(senha);
  cy.get('[data-test="submit-button"]').click();
});

Cypress.Commands.add("cadastrar", (nome, email, senha) => {
  cy.get('[data-test="input-name"]').type(nome);
  cy.get('[data-test="input-email"]').type(email);
  cy.get('[data-test="input-password"]').type(senha);
  cy.get('[data-test="input-confirm-password"]').type(senha);
  cy.get('[data-test="submit-button"]').click();
});

Cypress.Commands.add(
  "loginApi",
  (email, senha, tentativas = 4, baseUrl = "https://adopet-api-i8qu.onrender.com") => {
    const tentarLogin = (tentativasRestantes) =>
      cy
        .request({
          method: "POST",
          url: `${baseUrl}/adotante/login`,
          body: { email, password: senha },
          failOnStatusCode: false,
          timeout: 20000,
        })
        .then((res) => {
          const temToken =
            [200, 201].includes(res.status) &&
            typeof res.body?.token === "string" &&
            res.body.token.length > 0;

          if (temToken || tentativasRestantes <= 0) {
            return res;
          }

          cy.wait(5000);
          return tentarLogin(tentativasRestantes - 1);
        });

    return tentarLogin(tentativas);
  }
);

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
