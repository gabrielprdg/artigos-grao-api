# Artigos Grão API

Uma API REST baseada em NestJS para gerenciamento de artigos com integração MySQL e Prisma ORM.

## 📋 Índice

- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando a Aplicação](#executando-a-aplicação)
- [Executando Testes](#executando-testes)
- [Documentação da API](#documentação-da-api)
- [Banco de Dados](#banco-de-dados)
- [Configuração Docker](#configuração-docker)
- [Estrutura do Projeto](#estrutura-do-projeto)

## ✨ Funcionalidades

- **Gerenciamento de Artigos**: Criar, ler, atualizar e deletar artigos
- **Banco MySQL**: Persistência robusta de dados com MySQL
- **Prisma ORM**: Acesso type-safe ao banco de dados
- **Documentação Swagger**: Documentação interativa da API
- **Suporte Docker**: Aplicação e banco containerizados
- **Validação**: Validação de requisições com class-validator
- **CORS Habilitado**: Suporte para compartilhamento de recursos entre origens

## 📋 Pré-requisitos

- Node.js (v18 ou superior)
- npm ou yarn
- Docker e Docker Compose
- MySQL (se executando localmente sem Docker)

## 🚀 Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd artigos-grao-api
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**

   Certifique-se de que o arquivo `.env` contém:
   ```env
   DATABASE_URL="mysql://root:mysql@localhost:3307/article_db"
   ```

4. **Gere o cliente Prisma**
   ```bash
   npx prisma generate
   ```

## 🏃 Executando a Aplicação

### Opção 1: Usando Docker (Recomendado)

1. **Inicie a aplicação com Docker Compose**
   ```bash
   sudo docker-compose up --build
   ```

   Isso iniciará:
   - Banco de dados MySQL na porta 3307
   - Servidor da API na porta 3000

2. **Execute as migrações do banco**
   ```bash
   npx prisma db push
   ```

### Opção 2: Desenvolvimento Local

1. **Inicie o banco MySQL** (certifique-se de que o MySQL está rodando na porta 3307)

2. **Execute as migrações do banco**
   ```bash
   npx prisma db push
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   # Modo desenvolvimento com hot reload
   npm run start:dev

   # Modo produção
   npm run start:prod

   # Modo debug
   npm run start:debug
   ```

A API estará disponível em `http://localhost:3000`

## 🧪 Executando Testes

```bash
# Executar testes unitários
npm run test

# Executar testes em modo watch
npm run test:watch

# Executar testes com coverage
npm run test:cov

# Executar testes end-to-end
npm run test:e2e

# Executar testes em modo debug
npm run test:debug
```

## 📚 Documentação da API

A documentação da API é gerada automaticamente usando Swagger e está disponível em:

**http://localhost:3000/api**

A interface Swagger fornece:
- Endpoints interativos da API
- Esquemas de requisição/resposta
- Exemplos de requisições
- Informações de autenticação
- Testes da API em tempo real

### Principais Endpoints

- `GET /articles` - Buscar todos os artigos
- `GET /articles/:id` - Buscar artigo por ID
- `POST /articles` - Criar um novo artigo
- `PUT /articles/:id` - Atualizar um artigo
- `DELETE /articles/:id` - Deletar um artigo

## 🗄️ Banco de Dados

Este projeto usa MySQL com Prisma ORM para gerenciamento do banco de dados.

### Schema do Banco

A entidade principal é `Article` com a seguinte estrutura:
```prisma
model Article {
  id        String   @id @default(uuid())
  title     String
  content   String   @db.Text
  author    String
  url       String?
  tags      Json?    // Array de strings
  createdAt DateTime @default(now())
}
```

### Comandos do Banco

```bash
# Gerar cliente Prisma
npx prisma generate

# Aplicar mudanças do schema ao banco
npx prisma db push

# Visualizar banco no Prisma Studio
npx prisma studio

# Resetar banco de dados
npx prisma db reset
```

## 🐳 Configuração Docker

A aplicação inclui suporte Docker com os seguintes serviços:

- **artigos_db**: Banco de dados MySQL 8.0
- **artigos_api**: Aplicação NestJS


```

## 📁 Estrutura do Projeto

```
artigos-grao-api/
├── src/
│   ├── app.module.ts          # Módulo principal da aplicação
│   ├── main.ts                # Ponto de entrada da aplicação
│   └── ...                    # Módulos e serviços de funcionalidades
├── prisma/
│   └── schema.prisma          # Schema do banco de dados
├── test/                      # Arquivos de teste
├── docker-compose.yml         # Configuração dos serviços Docker
├── Dockerfile                 # Definição do container da aplicação
├── .env                       # Variáveis de ambiente
└── README.md                  # Este arquivo
```

## 🛠️ Scripts de Desenvolvimento

```bash
# Formatação de código
npm run format

# Linting
npm run lint

# Build da aplicação
npm run build
```

