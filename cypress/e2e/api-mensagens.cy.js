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
      const userId = resLogin.body.id; 

      cy.request({
        method: "GET",
        url: `https://adopet-api-i8qu.onrender.com/mensagem/${userId}`, 
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).is.not.empty;
        expect(res.body).to.have.property("msg");
      });
    });
  });
});