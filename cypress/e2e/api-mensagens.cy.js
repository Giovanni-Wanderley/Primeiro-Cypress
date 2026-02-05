describe("Api Adopet - login via UI e uso do token", () => {
  const email = Cypress.env("ADOPET_EMAIL") || "";
  const senha = Cypress.env("ADOPET_SENHA") || "";

  if (!email || !senha) {
    it("mensagens da API (skipped - credentials not set)", function () {
      this.skip();
    });
    return;
  }

  it("faz login pela UI, extrai token e chama a API", () => {
    cy.visit("https://adopet-frontend-cypress.vercel.app/");
    cy.get('[data-test="login-button"]').click();
    cy.login(email, senha);
    cy.contains("p", "Olá!", { timeout: 10000 }).should("be.visible");
    cy.window().then((win) => {
      const ls = win.localStorage;
      let token = null;
      const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/;

      for (let i = 0; i < ls.length; i++) {
        const value = ls.getItem(ls.key(i));
        if (typeof value === "string" && jwtRegex.test(value)) {
          token = value;
          break;
        }

        try {
          const parsed = JSON.parse(value);
          for (const k in parsed) {
            if (typeof parsed[k] === "string" && jwtRegex.test(parsed[k])) {
              token = parsed[k];
              break;
            }
          }
          if (token) break;
        } catch (e) {}
      }

      if (!token) {
        const cookies = win.document.cookie.split(";").map((c) => c.trim());
        for (const c of cookies) {
          if (
            c.startsWith("token=") ||
            c.startsWith("auth=") ||
            c.startsWith("authorization=")
          ) {
            token = c.split("=")[1];
            break;
          }
        }
      }

      expect(token, "JWT encontrado em localStorage ou cookies").to.be.a(
        "string",
      ).and.not.be.empty;

      const authorization = `Bearer ${token}`;
      cy.request({
        method: "GET",
        url: "https://adopet-api-i8qu.onrender.com/mensagem/f8208fb4-d426-4ed3-88b3-941a12b3deb4",
        headers: { Authorization: authorization },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.not.be.empty;
        expect(res.body).to.have.property("msg");
      });
    });
  });
});
