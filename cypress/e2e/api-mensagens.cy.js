describe("Api Adopet", () => {
  const authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmODIwOGZiNC1kNDI2LTRlZDMtODhiMy05NDFhMTJiM2RlYjQiLCJhZG9wdGVyTmFtZSI6Ikdpb3Zhbm5pIFdhbmRlcmxleSIsImlhdCI6MTc2OTczNjcyMSwiZXhwIjoxNzY5OTk1OTIxfQ.A2sIEd2Gf3tsqSLpFBShn4C-hPb40owIFpHa9qoaRPc`;

  it("mensagens da API", () => {
    cy.request({
      method: "GET",
      url: "https://adopet-api-i8qu.onrender.com/mensagem/f8208fb4-d426-4ed3-88b3-941a12b3deb4",
      headers: { authorization },
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).is.not.empty;
      expect(res.body).to.have.property("msg");
    });
  });
});
