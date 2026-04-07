describe("Api Adopet", () => {
  const loginUrl = "https://adopet-api-i8qu.onrender.com/adotante/login";
  const nomeEsperado = "teste";

  const getPayload = (token) => {
    const [, payloadBase64] = token.split(".");
    const payloadJson = atob(
      payloadBase64.replace(/-/g, "+").replace(/_/g, "/"),
    );

    return JSON.parse(payloadJson);
  };

  it("deve fazer login na api e verificar o nome no perfil do usuario autenticado", () => {
    cy.request({
      method: "POST",
      url: loginUrl,
      body: {
        email: Cypress.env("ADOPET_EMAIL"),
        password: Cypress.env("ADOPET_SENHA"),
      },
    }).then((res) => {
      expect([200, 201]).to.include(res.status);
      expect(res.body).to.have.property("token");

      const token = res.body.token;
      expect(token).to.be.a("string").and.not.be.empty;

      const payload = getPayload(token);

      expect(payload).to.have.property("sub");
      expect(payload.sub).to.be.a("string").and.not.be.empty;

      const authorization = `Bearer ${token}`;

      cy.request({
        method: "GET",
        url: `https://adopet-api-i8qu.onrender.com/adotante/perfil/${payload.sub}`,
        headers: { Authorization: authorization },
      }).then((perfilRes) => {
        expect(perfilRes.status).to.equal(200);
        expect(perfilRes.body).to.not.be.empty;
        expect(perfilRes.body).to.have.property("perfil");
        expect(perfilRes.body.perfil).to.have.property("nome");
        expect(perfilRes.body.perfil.nome).to.equal(nomeEsperado);
      });
    });
  });
});
