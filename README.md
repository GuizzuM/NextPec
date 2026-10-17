# Sistema Fazenda

Aplicação web para gerenciar fazendas e animais. O projeto usa Node.js, Express, EJS e MySQL.

## Como iniciar o projeto

### Pré-requisitos

- Node.js e npm
- MySQL

### 1. Instale as dependências

Na pasta do projeto, execute:

```bash
npm install
```

### 2. Configure o banco de dados

Crie o banco `pecuaria` e as tabelas `Fazenda` e `Animal`. O arquivo `sql/scripts.sql` contém os comandos de criação.

> Se executar o script manualmente, selecione o banco `pecuaria` antes de criar as tabelas.

Crie ou configure um arquivo `.env` na raiz do projeto com os dados da sua conexão MySQL:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=pecuaria
DB_PORT=3306
```

### 3. Inicie a aplicação

Modo de desenvolvimento, com reinicialização automática:

```bash
npm run dev
```

Modo normal:

```bash
npm start
```

A aplicação fica disponível em <http://localhost:5000>.

## Funcionalidades

### Gestão de fazendas

- Listar fazendas cadastradas
- Cadastrar uma fazenda
- Editar o nome de uma fazenda
- Excluir uma fazenda

### Gestão de animais

- Listar animais com SISBOV, raça, faixa etária, fazenda, peso e data de entrega
- Cadastrar animais e associá-los a uma fazenda
- Editar os dados de um animal
- Excluir um animal
