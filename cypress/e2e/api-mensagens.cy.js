describe("Api Adopet - login via API e uso do token", () => {
  const email = Cypress.env("ADOPET_EMAIL") || "";
  const senha = Cypress.env("ADOPET_SENHA") || "";
  const nome = Cypress.env("ADOPET_NOME") || "E2E User";
  const baseUrl = "https://adopet-api-i8qu.onrender.com";
  const loginUrl = `${baseUrl}/adotante/login`;
  const cadastroUrl =
    Cypress.env("ADOPET_CADASTRO_URL") || `${baseUrl}/adotante/cadastro`;
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

    const cadastrar = () =>
      cy.request({
        method: "POST",
        url: cadastroUrl,
        body: { nome, email, password: senha },
        failOnStatusCode: false,
        timeout: 20000,
      });

    warmup().then(() => {
      login(4).then((res) => {
        const notFoundEmail =
          res.status === 404 &&
          typeof res.body?.message === "string" &&
          res.body.message.toLowerCase().includes("email");

        if (notFoundEmail) {
          return cadastrar().then((cadRes) => {
            const okStatus = cadRes.status === 200 || cadRes.status === 201;
            const conflict = cadRes.status === 409;
            if (!okStatus && !conflict) {
              throw new Error(
                `Cadastro API falhou: status ${cadRes.status} - ${JSON.stringify(
                  cadRes.body
                )}`
              );
            }
            return login(4);
          });
        }

        if (res.status !== 200) {
          throw new Error(
            `Login API falhou: status ${res.status} - ${JSON.stringify(res.body)}`
          );
        }

        return res;
      }).then((finalLogin) => {
        if (finalLogin.status !== 200) {
          throw new Error(
            `Login API falhou apos cadastro: status ${finalLogin.status} - ${JSON.stringify(
              finalLogin.body
            )}`
          );
        }

        const token = finalLogin.body?.token;
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
