# Estudo Cypress

Projeto de estudos com Cypress para testes end-to-end e testes de API do AdoPet.

## Objetivo

Este repositorio foi criado para praticar automacao de testes com Cypress cobrindo:

- fluxos de interface
- validacoes de formulario
- login e cadastro
- consumo de API com autenticacao por token
- execucao em pipeline com GitHub Actions

## Tecnologias

- Node.js
- Cypress 13
- Mochawesome
- GitHub Actions
- Cypress Cloud

## Estrutura do projeto

```text
.
|-- .github/workflows/main.yml
|-- cypress/
|   |-- e2e/
|   |-- fixtures/
|   `-- support/
|-- cypress.config.js
|-- cypress.env.json
|-- package.json
`-- README.md
```

## Casos de teste automatizados

Os testes ficam em [cypress/e2e](c:/Users/luiz1/Desktop/estudo_cypress/cypress/e2e).

- [pagina_principal.cy.js](c:/Users/luiz1/Desktop/estudo_cypress/cypress/e2e/pagina_principal.cy.js): valida elementos e navegacao da landing page
- [pagina_home.cy.js](c:/Users/luiz1/Desktop/estudo_cypress/cypress/e2e/pagina_home.cy.js): valida listagem de pets e redirecionamento para login
- [cadastro-correto.cy.js](c:/Users/luiz1/Desktop/estudo_cypress/cypress/e2e/cadastro-correto.cy.js): testa cadastro com dados dinamicos
- [cadastro-incorreto.cy.js](c:/Users/luiz1/Desktop/estudo_cypress/cypress/e2e/cadastro-incorreto.cy.js): valida mensagens de erro no cadastro
- [login-correto.cy.js](c:/Users/luiz1/Desktop/estudo_cypress/cypress/e2e/login-correto.cy.js): testa login valido
- [login-incorreto.cy.js](c:/Users/luiz1/Desktop/estudo_cypress/cypress/e2e/login-incorreto.cy.js): valida erros de login e resposta simulada
- [api-mensagens.cy.js](c:/Users/luiz1/Desktop/estudo_cypress/cypress/e2e/api-mensagens.cy.js): autentica via API, extrai token JWT e consulta mensagens autenticadas

## Pre-requisitos

- Node.js instalado
- npm instalado
- Google Chrome instalado

## Instalacao

```powershell
npm install
```

## Configuracao de ambiente

Para rodar os testes locais, o arquivo [cypress.env.json](c:/Users/luiz1/Desktop/estudo_cypress/cypress.env.json) pode conter credenciais usadas nos fluxos.

Exemplo:

```json
{
  "email": "emailteste@teste.com",
  "senha": "Senha1234"
}
```

O teste de API usa variaveis de ambiente do Cypress. Em CI, elas sao fornecidas por secrets do GitHub Actions:

- `ADOPET_EMAIL`
- `ADOPET_SENHA`
- `CYPRESS_RECORD_KEY`

Variaveis opcionais para o teste de API:

- `ADOPET_NOME`
- `ADOPET_CADASTRO_URL`
- `ADOPET_MENSAGEM_ID`

## Como executar os testes

Abrir a interface do Cypress:

```powershell
npx cypress open
```

Rodar todos os testes no terminal:

```powershell
npx cypress run
```

Rodar apenas o teste de API:

```powershell
npx cypress run --spec "cypress/e2e/api-mensagens.cy.js"
```

Rodar apenas o teste de API no Chrome:

```powershell
npx cypress run --browser chrome --spec "cypress/e2e/api-mensagens.cy.js"
```

## Comandos disponiveis

Os scripts definidos em [package.json](c:/Users/luiz1/Desktop/estudo_cypress/package.json) sao:

```json
"scripts": {
  "test": "cypress run",
  "cy:open": "cypress open"
}
```

## Comandos customizados

Os comandos reutilizaveis ficam em [commands.js](c:/Users/luiz1/Desktop/estudo_cypress/cypress/support/commands.js).

- `cy.login(email, senha)`
- `cy.cadastrar(nome, email, senha)`

## Estrategia do teste de API

O teste em [api-mensagens.cy.js](c:/Users/luiz1/Desktop/estudo_cypress/cypress/e2e/api-mensagens.cy.js) segue este fluxo:

1. faz uma chamada inicial para aquecer a API
2. tenta login via `POST /adotante/login`
3. aceita resposta com token em `200` ou `201`
4. se o usuario nao existir, tenta cadastro
5. extrai o `sub` do token JWT para identificar o usuario autenticado
6. chama `GET /mensagem/{id}` com `Authorization: Bearer <token>`

Esse teste valida autenticacao por API sem depender da interface.

## Integracao continua

O workflow do GitHub Actions fica em [main.yml](c:/Users/luiz1/Desktop/estudo_cypress/.github/workflows/main.yml).

Ele executa:

- instalacao de dependencias com `npm ci`
- execucao dos testes Cypress
- upload de relatorios do Mochawesome
- upload de videos e screenshots
- integracao com Cypress Cloud quando `CYPRESS_RECORD_KEY` esta configurada

## Relatorios

O projeto usa Mochawesome como reporter.

Os resultados sao gerados em:

- [cypress/results](c:/Users/luiz1/Desktop/estudo_cypress/cypress/results)

Tambem podem ser gerados artefatos no CI:

- `cypress/videos`
- `cypress/screenshots`

## Boas praticas adotadas

- uso de fixtures para massa de dados
- comandos customizados para reduzir repeticao
- validacao de cenarios positivos e negativos
- uso de intercept em testes de erro
- execucao automatizada no GitHub Actions
- registro de execucoes no Cypress Cloud

## Proximas melhorias

- desacoplar melhor os dados entre specs
- revisar encoding dos arquivos com acentuacao quebrada
- atualizar o workflow para versoes mais novas do runtime do GitHub Actions
- expandir cobertura de API com cenarios negativos
