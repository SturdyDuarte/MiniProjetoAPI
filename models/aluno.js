// src/models/aluno.js
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Aluno extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 1. Relacionamento 1:N com Matrícula (Aluno tem muitas Matrículas)
      Aluno.hasMany(models.Matricula, {
          foreignKey: 'alunoId',
          as: 'matriculas'
      });

      // 2. Relacionamento N:N com Curso, usando Matrícula como tabela de junção
      Aluno.belongsToMany(models.Curso, {
          through: models.Matricula, // Tabela intermediária
          foreignKey: 'alunoId',     // Sua FK em Matricula
          otherKey: 'cursoId',       // A FK do outro modelo em Matricula
          as: 'cursosMatriculados'   // Alias para a associação
      });
    }
  }
  Aluno.init({
    id: { // Adicionar o ID e as restrições que faltam
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
  }, {
    sequelize,
    modelName: 'Aluno',
    // Adicionar outras opções, se necessário
    tableName: 'alunos', // Boa prática
    timestamps: false
  });
  return Aluno;
};