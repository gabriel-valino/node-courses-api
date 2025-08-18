# Primeira API Node.js

Este projeto é uma API desenvolvida em Node.js utilizando TypeScript, Drizzle ORM e PostgreSQL. O objetivo é servir como base para estudos e desafios de backend.

## Funcionalidades

- CRUD de cursos
- Integração com banco de dados PostgreSQL
- Rotas para criação, listagem e busca de cursos

## Estrutura do Projeto

```
docker-compose.yml         # Configuração do banco de dados PostgreSQL
server.ts                 # Arquivo principal do servidor
src/
  db/
    client.ts             # Conexão com o banco de dados
    schema.ts             # Definição dos esquemas/tabelas
  routes/
    create-course.ts      # Rota para criar curso
    get-course-by-id.ts   # Rota para buscar curso por ID
    get-courses.ts        # Rota para listar cursos
```

## Como executar

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd node-primeira-api
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Suba o banco de dados com Docker:**
   ```bash
   docker-compose up -d
   ```
4. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` com as informações de conexão do banco de dados.
   ```env
   DATABASE_URL=postgres://postgres:postgres@localhost:5432/desafio
   ```
5. **Execute as migrations (se necessário):**
   ```bash
   # Comando depende da ferramenta de migrations utilizada
   # Exemplo: npx drizzle-kit migrate:push
   ```
6. **Inicie o servidor:**
   ```bash
   npm run dev
   ```

## Rotas principais

- `POST /courses` — Cria um novo curso
- `GET /courses` — Lista todos os cursos
- `GET /courses/:id` — Busca curso por ID

## Requisitos

- Node.js >= 18
- Docker
- PostgreSQL 17

## Licença

Este projeto é livre para uso educacional.

## Diagrama de Fluxo Principal

```mermaid
flowchart TD
   A[Usuário] -->|HTTP Request| B[Servidor Node.js]
   B --> C{Rota da API}
   C -->|POST /courses| D[Validação dos dados]
   D --> E[Salva no PostgreSQL]
   E --> F[Retorna: Curso criado]
   C -->|GET /courses| G[Consulta todos cursos]
   G --> H[Retorna: Lista de cursos]
   C -->|GET /courses/:id| I[Consulta curso por ID]
   I --> J[Retorna: Curso encontrado]
   B -.-> K[Erros ou dados inválidos]
   K --> L[Retorna: Erro ao usuário]
```
