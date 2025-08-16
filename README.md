# NestJS Boilerplate

Um boilerplate robusto e escalável para aplicações NestJS, desenvolvido com foco em arquitetura limpa, boas práticas e facilidade de uso para novos projetos.

## 🚀 Características

### ✨ Funcionalidades Principais
- **Arquitetura Limpa (Clean Architecture)** - Separação clara entre domínio, aplicação e infraestrutura
- **Autenticação JWT** - Sistema completo de autenticação com refresh tokens
- **Banco de Dados PostgreSQL** - Configurado com Prisma ORM e schema modular
- **Documentação Automática** - Swagger/OpenAPI integrado
- **Logging Estruturado** - Pino logger com formatação otimizada
- **Cache Manager** - Sistema de cache configurável
- **Validação de Dados** - Class-validator integrado
- **Testes Automatizados** - Jest configurado para testes unitários e e2e
- **Docker** - Configuração para desenvolvimento e produção

### 🏗️ Infraestrutura
- **AWS S3** - Armazenamento de arquivos
- **AWS SQS** - Sistema de mensageria
- **New Relic** - Monitoramento e APM
- **Discord** - Sistema de notificações
- **Fastify** - Servidor HTTP de alta performance
- **Prisma** - ORM moderno com migrations automáticas

### 🛠️ Ferramentas de Desenvolvimento
- **TypeScript** - Tipagem estática
- **ESLint + Prettier** - Linting e formatação de código
- **Husky** - Git hooks
- **Commitlint** - Padronização de commits
- **Prisma Studio** - Interface visual para o banco de dados

## 📋 Pré-requisitos

- Node.js (versão 18 ou superior)
- pnpm (recomendado) ou npm
- Docker e Docker Compose
- PostgreSQL

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd nest_boilerplate
```

2. **Instale as dependências**
```bash
pnpm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env
```

4. **Configure as variáveis no arquivo .env**
```env
# Database
POSTGRES_URL=postgresql://postgres:your_password@localhost:5438/your_database
POSTGRES_PASSWORD=your_password
POSTGRES_DB=your_database
POSTGRES_VOLUME_PATH=./postgres-data

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

# AWS (opcional)
AWS_S3_REGION=us-east-1
AWS_S3_KEY=your_access_key
AWS_S3_SECRET=your_secret_key
AWS_S3_ASSETS_BUCKET=your_bucket

AWS_SQS_PREFIX=your_prefix
AWS_SQS_REGION=us-east-1
AWS_SQS_ACCESS_KEY_ID=your_access_key
AWS_SQS_SECRET_ACCESS_KEY=your_secret_key

# New Relic (opcional)
NEW_RELIC_LICENSE_KEY=your_license_key
NEW_RELIC_APP_NAME=your_app_name
NEW_RELIC_LOG_URL=your_log_url


```

5. **Inicie o banco de dados**
```bash
pnpm up:db
```

6. **Execute as migrações**
```bash
pnpm migration:run
```

7. **Execute o seed (opcional)**
```bash
pnpm seed:run
```

8. **Inicie o servidor de desenvolvimento**
```bash
pnpm dev
```

_Se, por alguma razão, você receber uma mensagem de erro dizendo algo como "@prisma/client was not initialized" ou "@prisma/client has not exported member" rode o comando `pnpm prisma:generate` ou `pnpm generate`_

O servidor estará disponível em `http://localhost:4000` e o Prisma Studio em `http://localhost:5555`.

## 📚 Estrutura do Projeto

```
src/
├── module/                  # Módulos da aplicação
│   ├── user/               # Módulo de usuários
│   │   ├── domain/         # Regras de negócio
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── mappers/        # Mappers para conversão
│   │   ├── repositories/   # Interfaces e implementações
│   │   └── useCases/       # Casos de uso
│   │       ├── auth/       # Autenticação (signup, signin, refresh)
│   │       └── user/       # CRUD de usuários
│   └── task/               # Módulo de tarefas
│       ├── domain/         # Regras de negócio
│       ├── dto/            # Data Transfer Objects
│       ├── mappers/        # Mappers para conversão
│       ├── repositories/   # Interfaces e implementações
│       └── useCases/       # Casos de uso
│           ├── board/      # CRUD de boards
│           ├── step/       # CRUD de steps
│           └── task/       # CRUD de tasks
├── shared/                 # Código compartilhado
│   ├── config/            # Configurações
│   ├── core/              # Entidades e value objects
│   ├── decorators/        # Decorators customizados
│   ├── exceptions/        # Filtros de exceção
│   ├── guards/            # Guards de autenticação
│   ├── interceptors/      # Interceptors
│   ├── strategies/        # Estratégias de autenticação
│   ├── services/          # Serviços compartilhados
│   ├── test/              # Configurações de teste
│   ├── types/             # Tipos compartilhados
│   └── utils/             # Utilitários
└── main.ts                # Ponto de entrada da aplicação
```

## 🔧 Scripts Disponíveis

### Desenvolvimento
```bash
pnpm dev              # Inicia o servidor em modo desenvolvimento + Prisma Studio
pnpm start            # Inicia o servidor
pnpm start:debug      # Inicia em modo debug
pnpm start:prod       # Inicia em modo produção
```

### Banco de Dados
```bash
pnpm up:db            # Inicia o banco de dados
pnpm down             # Para o banco de dados
pnpm migration:create # Cria uma nova migração
pnpm migration:run    # Executa as migrações
pnpm migration:deploy # Deploy das migrações
pnpm generate         # Gera o cliente Prisma
pnpm seed:run         # Executa o seed
pnpm studio           # Abre o Prisma Studio
```

### Testes
```bash
pnpm test             # Executa todos os testes
pnpm test:watch       # Executa testes em modo watch
pnpm test:cov         # Executa testes com cobertura
pnpm test:debug       # Executa testes em modo debug
pnpm test:e2e         # Executa testes end-to-end
```

### Qualidade de Código
```bash
pnpm lint             # Executa o linter
pnpm typechecks       # Verifica tipos TypeScript
```

## 🔐 Autenticação

O boilerplate inclui um sistema completo de autenticação JWT:

### Endpoints Disponíveis
- `POST /v1/auth/sign-up` - Cadastro de usuário
- `POST /v1/auth/sign-in` - Login
- `POST /v1/auth/refresh` - Renovação de token



## 📦 Módulos Incluídos

### User Module
- **Autenticação**: Sign up, Sign in, Refresh token
- **CRUD de Usuários**: Create, Read, Update, Delete, List
- **Validação de Dados**: Class-validator integrado
- **Testes**: Unitários e e2e completos

### Task Module
- **Boards**: CRUD completo de quadros de tarefas
- **Steps**: CRUD completo de etapas dentro dos boards
- **Tasks**: CRUD completo de tarefas com prioridades e datas
- **Relacionamentos**: Boards → Steps → Tasks
- **Validação**: Dados validados com class-validator
- **Testes**: Cobertura completa de testes

### Estrutura do Banco de Dados
```
UserModel
├── id, name, email, type, password
├── createdAt, updatedAt, deletedAt
└── tasks[], boards[]

BoardModel
├── id, name, ownerId
├── createdAt, updatedAt, deletedAt
├── owner (UserModel)
└── steps[]

StepModel
├── id, boardId, name
├── createdAt, updatedAt, deletedAt
├── board (BoardModel)
└── tasks[]

TaskModel
├── id, stepId, title, description, assigneeId, dueDate, priority
├── createdAt, updatedAt, deletedAt
├── step (StepModel)
└── assignee (UserModel)
```

## 📖 Documentação da API

A documentação Swagger está disponível em:
- **Desenvolvimento**: `http://localhost:4000/docs`
- **Produção**: `https://your-domain.com/docs`

### Endpoints Principais

#### Autenticação
- `POST /v1/auth/sign-up` - Cadastro de usuário
- `POST /v1/auth/sign-in` - Login
- `POST /v1/auth/refresh` - Renovação de token

#### Usuários
- `GET /v1/user` - Lista usuários (com paginação)
- `GET /v1/user/:id` - Busca usuário por ID
- `PUT /v1/user/:id` - Atualiza usuário
- `DELETE /v1/user/:id` - Remove usuário

#### Boards
- `POST /v1/board` - Cria board
- `GET /v1/board` - Lista boards do usuário
- `GET /v1/board/:id` - Busca board por ID
- `PUT /v1/board/:id` - Atualiza board
- `DELETE /v1/board/:id` - Remove board

#### Steps
- `POST /v1/step` - Cria step
- `GET /v1/step` - Lista steps
- `GET /v1/step/:id` - Busca step por ID
- `PUT /v1/step/:id` - Atualiza step
- `DELETE /v1/step/:id` - Remove step

#### Tasks
- `POST /v1/task` - Cria task
- `GET /v1/task/:id` - Busca task por ID
- `PUT /v1/task/:id` - Atualiza task
- `DELETE /v1/task/:id` - Remove task

## 🧪 Testes

### Estrutura de Testes
- **Testes Unitários**: `*.spec.ts`
- **Testes E2E**: `*.e2e-spec.ts`
- **Fakes**: Implementações falsas para testes
- **Setup**: Configuração automática para testes

### Executando Testes
```bash
# Testes unitários
pnpm test

# Testes com cobertura
pnpm test:cov

# Testes end-to-end
pnpm test:e2e

# Testes em modo debug
pnpm test:debug
```

## 🐳 Docker

### Desenvolvimento
```bash
# Banco de dados
pnpm up:db

# Para o banco de dados
pnpm down
```

### Produção
```bash
# Build da imagem
docker build -t nestjs-boilerplate .

# Executar container
docker run -p 4000:4000 nestjs-boilerplate
```

## 🔧 Configurações

### Variáveis de Ambiente Principais
- `PORT` - Porta do servidor (padrão: 4000)
- `NODE_ENV` - Ambiente (development, production, test)
- `POSTGRES_URL` - URL de conexão com PostgreSQL
- `JWT_SECRET` - Chave secreta para JWT
- `JWT_REFRESH_SECRET` - Chave secreta para refresh token

### Configurações do Logger
O sistema usa Pino para logging estruturado:
- **Desenvolvimento**: Logs formatados e coloridos
- **Produção**: Logs em JSON para melhor parsing

### Configurações do Prisma
- **Schema Modular**: Arquivos separados por entidade em `prisma/schema/`
- **Migrations**: Automáticas com `pnpm migration:run`
- **Studio**: Interface visual em `http://localhost:5555`

## 🚀 Deploy

### Preparação para Produção
1. Configure as variáveis de ambiente de produção
2. Execute as migrações: `pnpm migration:run`
3. Build da aplicação: `pnpm build`
4. Execute: `pnpm start:prod`

### Plataformas Suportadas
- **Heroku**: Configuração automática
- **AWS**: ECS, Lambda, EC2
- **Google Cloud**: App Engine, Cloud Run
- **Azure**: App Service, Container Instances

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a [documentação](https://docs.nestjs.com/)
2. Procure por issues similares no repositório
3. Abra uma nova issue com detalhes do problema

## 🔄 Atualizações

Para manter o boilerplate atualizado:

```bash
# Atualizar dependências
pnpm update

# Verificar vulnerabilidades
pnpm audit

# Atualizar Prisma
pnpm prisma update
```

---

**Desenvolvido com ❤️ usando NestJS**
