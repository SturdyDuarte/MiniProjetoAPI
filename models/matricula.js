'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matricula extends Model {
    /**
     * Define as associações
     */
    static associate(models) {
      // Uma Matrícula pertence a um Aluno (FK alunoId)
      Matricula.belongsTo(models.Aluno, {
          foreignKey: 'alunoId',
          as: 'aluno', // Alias para carregar o Aluno associado
      });

      // Uma Matrícula pertence a um Curso (FK cursoId)
      Matricula.belongsTo(models.Curso, {
          foreignKey: 'cursoId',
          as: 'curso', // Alias para carregar o Curso associado
      });
    }
  }

  // Definição dos atributos da Matrícula
  Matricula.init({
    // O ID primário (PK) deve ser adicionado aqui, se o CLI não o fez:
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Os campos FKs já estão definidos na inicialização:
    alunoId: DataTypes.INTEGER,
    cursoId: DataTypes.INTEGER,
    dataMatricula: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'Matricula',
    tableName: 'matriculas', // Boa prática
    timestamps: false // Se você não quiser as colunas createdAt e updatedAt
  });

  return Matricula;
};