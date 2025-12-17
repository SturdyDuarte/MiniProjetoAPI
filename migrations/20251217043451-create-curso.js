'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false // CORREÇÃO 1: Nome é obrigatório
      },
      cargaHoraria: { // Note: O CLI pode gerar cargaHoraria ou carga_horaria
        type: Sequelize.INTEGER,
        allowNull: false // CORREÇÃO 2: Carga Horária é obrigatória
      },
      modalidade: {
        type: Sequelize.STRING,
        allowNull: false // CORREÇÃO 3: Modalidade é obrigatória
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cursos');
  }
};