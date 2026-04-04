# Estudo Cypress

[![CI - Cypress Tests](https://github.com/Giovanni-Wanderley/Primeiro-Cypress/actions/workflows/main.yml/badge.svg)](https://github.com/Giovanni-Wanderley/Primeiro-Cypress/actions/workflows/main.yml)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-13.17.0-69D3A7?logo=cypress&logoColor=white)

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

## Matriz resumida de cenarios

| ID | Arquivo | Tipo | Cenario validado | Resultado esperado |
|---|---|---|---|---|
| CT-01 | `pagina_principal.cy.js` | UI | acesso a pagina principal e navegacao inicial | pagina carregada com titulo correto e elementos principais visiveis |
| CT-02 | `pagina_home.cy.js` | UI | acesso a home e tentativa de contato sem login | lista de pets visivel e redirecionamento para login ao tentar contato |
| CT-03 | `cadastro-correto.cy.js` | UI | cadastro com dados validos | usuario cadastrado e redirecionamento para tela de login |
| CT-04 | `cadastro-incorreto.cy.js` | UI | cadastro com dados invalidos | exibicao de mensagens de validacao no formulario |
| CT-05 | `login-correto.cy.js` | UI | login com credenciais validas | autenticacao concluida e exibicao da saudacao ao usuario |
| CT-06 | `login-incorreto.cy.js` | UI | login com dados invalidos e erro simulado de API | mensagens de erro de validacao e falha de autenticacao exibidas na interface |
| CT-07 | `api-mensagens.cy.js` | API | autenticacao via API e consulta autenticada | token recebido, identificacao do usuario autenticado e retorno da mensagem protegida |

## Destaques tecnicos e de QA

O projeto combina testes de interface e testes de API com foco em estabilidade, isolamento e reuso.

### Testes de API e resiliencia

- o teste de API executa uma chamada de warmup antes do fluxo principal para reduzir impacto de cold start do ambiente
- o fluxo trata resposta de usuario nao encontrado e tenta provisionar o dado de teste antes de repetir o login
- o token JWT retornado pela autenticacao e decodificado para extrair o campo `sub`, usado na consulta autenticada de mensagens
- credenciais e configuracoes sensiveis sao lidas por variaveis de ambiente via `Cypress.env`

### Estrategias de teste de interface

- o cadastro usa email dinamico com `Date.now()` para evitar conflito com usuarios existentes
- o teste de cadastro persiste os dados gerados em [usuario.json](c:/Users/luiz1/Desktop/estudo_cypress/cypress/fixtures/usuario.json), permitindo reuso posterior no login
- o fluxo de login incorreto usa `cy.intercept` para simular erro de API e validar a reacao da interface sem depender do backend real

### Boas praticas observadas

- uso predominante de seletores `data-test`, mais estaveis que classes CSS
- validacao de cenarios positivos e negativos
- separacao de massa de dados em fixtures
- cobertura de jornada do usuario e validacao direta de API no mesmo projeto

## Cenarios negativos cobertos

Os testes tambem validam comportamentos de erro e regras de rejeicao, nao apenas fluxos de sucesso.

- cadastro com email invalido
- cadastro com senha fora do padrao esperado
- login com email em formato invalido
- login com senha invalida
- falha simulada da API de login com `cy.intercept`
- usuario nao encontrado no fluxo da API, com tentativa de provisionamento antes de novo login

## Resultados esperados por tipo de teste

### Interface

- exibir textos principais da landing page
- exibir cards de animais na home
- redirecionar para login quando o usuario tenta falar com o responsavel sem autenticacao
- exibir mensagens de validacao em formularios preenchidos incorretamente
- concluir login e cadastro quando os dados sao validos

### API

- retornar autenticacao com token no login
- aceitar resposta de login com status `200` ou `201` quando houver token
- identificar o usuario autenticado pelo campo `sub` do JWT
- consultar endpoint protegido com header `Authorization: Bearer <token>`
- falhar explicitamente quando login, cadastro ou consulta de mensagem retornarem resposta inesperada

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

Exemplo minimo para fluxos de interface:

```json
{
  "email": "emailteste@teste.com",
  "senha": "Senha1234"
}
```

Exemplo mais completo para interface e API:

```json
{
  "email": "emailteste@teste.com",
  "senha": "Senha1234",
  "ADOPET_EMAIL": "usuario_api@teste.com",
  "ADOPET_SENHA": "Senha1234",
  "ADOPET_NOME": "Usuario API",
  "ADOPET_CADASTRO_URL": "https://adopet-api-i8qu.onrender.com/adotante/register",
  "ADOPET_MENSAGEM_ID": ""
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

## Passo a passo manual no AdoPet

Baseado no fluxo atual do site [AdoPet](https://adopet-frontend-cypress.vercel.app) e nos cenarios cobertos pelos testes automatizados.

### 1. Acesso a pagina principal

Caso relacionado: `CT-01`

- acessar a URL inicial do projeto
- validar a exibicao do logo `adopet`
- validar o texto de boas-vindas
- localizar o botao `Ver pets disponiveis para adocao`
- observar os links `Cadastrar` e `Fazer login`

### 2. Navegacao para a home

Caso relacionado: `CT-02`

- clicar em `Ver pets disponiveis para adocao`
- validar o carregamento da pagina `/home`
- confirmar a exibicao dos cards com os animais disponiveis
- confirmar a presenca da acao `Falar com responsavel`

### 3. Fluxo de cadastro manual

Caso relacionado: `CT-03`

- na landing page, clicar em `Cadastrar`
- validar a tela com o texto `Ainda nao tem cadastro?`
- preencher os campos:
  - nome
  - e-mail
  - senha
  - confirme sua senha
- clicar em `Cadastrar`
- resultado esperado:
  - em caso de sucesso, redirecionamento para a tela de login
  - em caso de erro, exibicao das mensagens de validacao

### 4. Fluxo de login manual

Caso relacionado: `CT-05`

- na landing page, clicar em `Fazer login`
- validar a tela com o texto `Ja tem conta? Faca seu login:`
- preencher:
  - e-mail
  - senha
- clicar em `Entrar`
- resultado esperado:
  - em caso de sucesso, autenticacao do usuario
  - em caso de falha, exibicao da mensagem correspondente

### 5. Validacao de regra sem autenticacao

Caso relacionado: `CT-02`

- acessar a home sem estar logado
- clicar em `Falar com responsavel` em qualquer card
- resultado esperado:
  - redirecionamento para a tela de login

### 6. Validacoes negativas recomendadas

- `CT-04`: tentar cadastro com e-mail invalido
- `CT-04`: tentar cadastro com senha fora da regra esperada
- `CT-06`: tentar login com e-mail invalido
- `CT-06`: tentar login com senha incorreta
- validar se a interface informa o erro corretamente ao usuario

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
