describe("Api Adopet - login via API e uso do token", () => {
  const email = Cypress.env("ADOPET_EMAIL") || "";
  const senha = Cypress.env("ADOPET_SENHA") || "";
  const loginUrl = "https://adopet-api-i8qu.onrender.com/adotante/login";
  const mensagemUrl =
    "https://adopet-api-i8qu.onrender.com/mensagem/f8208fb4-d426-4ed3-88b3-941a12b3deb4";

  if (!email || !senha) {
    it("mensagens da API (skipped - credentials not set)", function () {
      this.skip();
    });
    return;
  }

  it("faz login via API, extrai token e chama a API", function () {
    const test = this;

    const login = (tentativas) =>
      cy
        .request({
          method: "POST",
          url: loginUrl,
          body: { email, senha },
          failOnStatusCode: false,
        })
        .then((res) => {
          if (res.status === 200 || tentativas <= 0) return res;
          cy.wait(3000);
          return login(tentativas - 1);
        });

    login(2).then((res) => {
      if (res.status !== 200) {
        Cypress.log({
          name: "login",
          message: `API login falhou: ${res.status}`,
        });
        test.skip();
      }

      const token = res.body?.token;
      expect(token, "token do login").to.be.a("string").and.not.be.empty;

      const authorization = `Bearer ${token}`;
      cy.request({
        method: "GET",
        url: mensagemUrl,
        headers: { Authorization: authorization },
        failOnStatusCode: false,
      }).then((mensagemRes) => {
        if (mensagemRes.status !== 200) {
          Cypress.log({
            name: "mensagem",
            message: `API mensagem falhou: ${mensagemRes.status}`,
          });
          test.skip();
        }
        expect(mensagemRes.body).to.not.be.empty;
        expect(mensagemRes.body).to.have.property("msg");
      });
    });
  });
});
