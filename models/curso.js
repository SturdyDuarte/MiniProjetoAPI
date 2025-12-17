'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    /**
     * Define as associações (Chamado pelo models/index.js)
     */
    static associate(models) {
      // 1. Relacionamento 1:N com Matrícula (Curso tem muitas Matrículas)
      // Esta linha é necessária para a associação hasMany/belongsTo
      Curso.hasMany(models.Matricula, {
          foreignKey: 'cursoId', // Chave estrangeira no modelo Matrícula
          as: 'matriculas' // Alias para incluir as matrículas diretamente
      });

      // 2. Relacionamento N:N com Aluno, usando Matrícula como tabela de junção
      Curso.belongsToMany(models.Aluno, {
          through: models.Matricula, // Tabela intermediária
          foreignKey: 'cursoId',     // Sua FK em Matrícula
          otherKey: 'alunoId',       // A FK do outro modelo em Matrícula
          as: 'alunosMatriculados'   // Alias para carregar os alunos
      });
    }
  }

  // Definição dos atributos do Curso
  Curso.init({
    // Adicione o ID se ele não estiver sendo gerado automaticamente
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // O tipo INTEGER é correto para cargaHoraria
    cargaHoraria: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    modalidade: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Curso',
    tableName: 'cursos', // Boa prática
    timestamps: false // Se você não quiser as colunas createdAt e updatedAt
  });

  return Curso;
};

