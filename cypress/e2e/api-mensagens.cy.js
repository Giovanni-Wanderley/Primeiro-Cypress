describe("Api Adopet", () => {
  const token = Cypress.env('API_TOKEN') || '';
  if (!token) {
    // Aviso durante execução local/CI se o token não for fornecido
    // eslint-disable-next-line no-console
    console.warn('API_TOKEN não definido. Configure via CYPRESS_API_TOKEN env var ou cypress.env.json');
  }
  const authorization = token ? `Bearer ${token}` : '';

  it("mensagens da API", () => {
    cy.request({
      method: "GET",
      url: "https://adopet-api-i8qu.onrender.com/mensagem/f8208fb4-d426-4ed3-88b3-941a12b3deb4",
      headers: authorization ? { authorization } : {},
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).is.not.empty;
      expect(res.body).to.have.property("msg");
    });
  });
});
