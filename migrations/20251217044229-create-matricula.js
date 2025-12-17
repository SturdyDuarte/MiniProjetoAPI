'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matriculas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      alunoId: {
        type: Sequelize.INTEGER,
        // CORREÇÃO 1: Definir Chave Estrangeira (FK)
        references: {
          model: 'Alunos', // Nome da tabela que está referenciando
          key: 'id'
        },
        onUpdate: 'CASCADE', // Opcional: Atualizar FK se o PK mudar
        onDelete: 'CASCADE', // Opcional: Deletar matrícula se o Aluno for deletado
        allowNull: false // Tornar a FK obrigatória
      },
      cursoId: {
        type: Sequelize.INTEGER,
        // CORREÇÃO 2: Definir Chave Estrangeira (FK)
        references: {
          model: 'Cursos', // Nome da tabela que está referenciando
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false // Tornar a FK obrigatória
      },
      dataMatricula: {
        type: Sequelize.DATEONLY,
        allowNull: false // CORREÇÃO 3: Campo dataMatricula é obrigatório
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matriculas');
  }
};