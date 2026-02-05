describe("Api Adopet - login via API e uso do token", () => {
  const email = Cypress.env("ADOPET_EMAIL") || "";
  const senha = Cypress.env("ADOPET_SENHA") || "";
  const baseUrl = "https://adopet-api-i8qu.onrender.com";
  const loginUrl = `${baseUrl}/adotante/login`;
  const mensagemUrl =
    `${baseUrl}/mensagem/f8208fb4-d426-4ed3-88b3-941a12b3deb4`;

  if (!email || !senha) {
    it("mensagens da API (skipped - credentials not set)", function () {
      this.skip();
    });
    return;
  }

  it("faz login via API, extrai token e chama a API", () => {
    const warmup = () =>
      cy.request({
        method: "GET",
        url: baseUrl,
        failOnStatusCode: false,
        timeout: 20000,
      });

    const login = (tentativas) =>
      cy
        .request({
          method: "POST",
          url: loginUrl,
          body: { email, password: senha },
          failOnStatusCode: false,
          timeout: 20000,
        })
        .then((res) => {
          if (res.status === 200 || tentativas <= 0) return res;
          cy.wait(5000);
          return login(tentativas - 1);
        });

    warmup().then(() => {
      login(4).then((res) => {
        if (res.status !== 200) {
          throw new Error(
            `Login API falhou: status ${res.status} - ${JSON.stringify(res.body)}`
          );
        }

        const token = res.body?.token;
        expect(token, "token do login").to.be.a("string").and.not.be.empty;

        const authorization = `Bearer ${token}`;
        cy.request({
          method: "GET",
          url: mensagemUrl,
          headers: { Authorization: authorization },
          failOnStatusCode: false,
          timeout: 20000,
        }).then((mensagemRes) => {
          if (mensagemRes.status !== 200) {
            throw new Error(
              `Mensagem API falhou: status ${mensagemRes.status} - ${JSON.stringify(
                mensagemRes.body
              )}`
            );
          }
          expect(mensagemRes.body).to.not.be.empty;
          expect(mensagemRes.body).to.have.property("msg");
        });
      });
    });
  });
});
