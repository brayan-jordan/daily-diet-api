# daily diet api

Desenvolvi uma aplicação back-end completa para fazer o controle de refeições dentro de uma determinada dieta. A aplicação foi desenvolvida utilizando NodeJS e contém os seguintes endereços:

- (`POST`, /users) Cadastro de usuários
- (`POST`, /auth) Autenticação de usuários utilizando JWT
- (`POST`, /meals) Cadastro de refeições
- (`GET`, /meals) Listagem de refeições
- (`GET`, /meals/:id) Busca de refeição por ID
- (`PUT`, /meals/:id) Edição de refeições
- (`DELETE`, /meals/:id) Exclusão de refeições
- (`GET`, /meals/metrics) Busca de métricas para dashboard

## extras

- Todos os endpoints estão protegidos por autenticação, exceto os de cadastro e autenticação de usuários.
- Existe um arquivo chamado `Insomnia_2023-07-10.json` na raiz do projeto que pode ser importado no Insomnia para testar os endpoints.

## instalação

Para rodar a aplicação localmente, é necessário criar um arquivo .env na raiz do projeto que pode ser baseado no arquivo .env.example. Após isso, basta rodar os seguintes comandos:

```bash
# installing dependencies
$ npm install

# running migrations
$ npm run knex -- migrate:latest

# run the application on development mode
$ npm run dev
```

## information on technologies used in the project

- [NodeJS](https://nodejs.org/en) (recomenda-se a versão LTS ou superior a 18)
- [SQLite](https://www.sqlite.org/index.html) (banco de dados)
- [Knex](https://knexjs.org) (query builder para banco de dados)
- [Fastify](https://fastify.dev) (micro-framework para criação de rotas)
- [Typescript](https://www.typescriptlang.org/) (todos os arquivos do projeto são escritos em typescript)
- [ESLint](https://eslint.org) (ferramenta para padronização de código)
- [Dotenv](https://www.npmjs.com/package/dotenv) (biblioteca para carregar variáveis de ambiente)
- [Zod](https://zod.dev/) (biblioteca para validação de dados)
- [Tsx](https://www.npmjs.com/package/tsx) (leitor de arquivos typescript para executar o projeto em desenvolvimento)
- [Tsup](https://www.npmjs.com/package/tsup) (compilador de typescript para javascript para executar o projeto em produção)
