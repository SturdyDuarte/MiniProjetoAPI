# 🎓 Sistema de Gestão Acadêmica API

Esta é uma API REST funcional desenvolvida em **Node.js** com **Express** e **Sequelize ORM**. O sistema permite gerenciar alunos, cursos e as matrículas que os vinculam, utilizando um banco de dados SQLite.

## 🛠️ Tecnologias Utilizadas

* **Node.js**: Ambiente de execução.
* **Express**: Framework web para criação de rotas.
* **Sequelize**: ORM para mapeamento e manipulação do banco de dados.
* **SQLite**: Banco de dados relacional leve (armazenado em arquivo local).

## 📂 Estrutura do Projeto

A estrutura foi organizada seguindo as melhores práticas de separação de pastas após a inicialização do Sequelize:

```
MINIPROJETOAPI/
├── config/          # Configurações de conexão com o banco de dados
├── database/        # Arquivo local do SQLite
├── migrations/      # Histórico de versões das tabelas
├── models/          # Definições das entidades (Aluno, Curso, Matricula)
├── src/
│   ├── controllers/ # Lógica de negócio da API
│   ├── routes.js    # Definição de todos os endpoints
│   └── server.js    # Ponto de entrada (start do servidor)
└── package.json 
```
🚀 Como Executar o Projeto
1. Clonar o repositório e instalar dependências

`git clone https://github.com/sturdyduarte/MiniProjetoAPI.git
cd MiniProjetoAPI
npm install`

2. Rodar as Migrations
Este comando criará as tabelas Alunos, Cursos e Matriculas automaticamente no seu banco de dados local:

`npx sequelize-cli db:migrate`

3. Iniciar o servidor

`node src/server.js`
O servidor iniciará em http://localhost:3000.

📌 Endpoints da API
*Alunos*
GET /alunos: Lista todos os alunos registrados.

POST /alunos: Cria um novo aluno.

GET /alunos/:id/cursos: Lista todos os cursos em que um aluno específico está matriculado.

*Cursos*
GET /cursos: Lista todos os cursos.

POST /cursos: Cria um novo curso.

GET /cursos/:id/alunos: Lista todos os alunos matriculados em um curso específico.

*Matrículas*
POST /matriculas: Realiza a matrícula de um aluno em um curso.

Corpo esperado: { "alunold": 1, "cursoId": 3 }

DELETE /matriculas/:id: Remove uma matrícula do sistema.
