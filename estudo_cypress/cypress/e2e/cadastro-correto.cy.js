describe('Página de Cadastro', () => {
  it('Preencher os campos do formulário corretamente para cadastrar um novo usuário', () => {

    const emailDinamico = `giovanni${Date.now()}@email.com`;

    cy.visit('https://adopet-frontend-cypress.vercel.app/');
    cy.contains('a', 'Cadastrar').click();
    cy.get('input[name="nome"]').type('Giovanni Wanderley');
    cy.get('input[name="email"]').type(emailDinamico);
    cy.get('input[name="password"]').type('Senha123');
    cy.get('input[name="confirm_password"]').type('Senha123');

    cy.writeFile('cypress/fixtures/usuario.json', { email: emailDinamico });
    
    cy.contains('button', 'Cadastrar').click();
  
  })
})