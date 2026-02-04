describe("Api Adopet", () => {
  it("Deve buscar as mensagens da API", () => {
    const email = Cypress.env('email');
    const senha = Cypress.env('senha');

    cy.request({
      method: 'POST',
      url: 'https://adopet-api-i8qu.onrender.com/adotante/login',
      body: { email, senha }
    }).then((resLogin) => {
      const token = resLogin.body.token;
      
      cy.request({
        method: "GET",
        url: "https://adopet-api-i8qu.onrender.com/mensagem/f8208fb4-d426-4ed3-88b3-941a12b3deb4",
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        expect(res.status).to.eq(200);
      });
    });
  });
});