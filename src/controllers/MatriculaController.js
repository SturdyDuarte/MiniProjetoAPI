// src/controllers/MatriculaController.js

// Importação corrigida: Sobe dois níveis (../..), alcançando a pasta 'models' na raiz
const { Matricula, Aluno, Curso } = require('../../models');

module.exports = {
    // Cria uma matrícula (POST /matriculas)
    // Espera: { "alunold": 1, "cursoId": 3 } no corpo da requisição
    async store(req, res) {
        // Mapeia alunold (do body) para alunoId (do modelo)
        const { alunold, cursoId } = req.body; 
        const alunoId = alunold;

        try {
            // 1. Verificar se as FKs (Aluno e Curso) existem
            const alunoExiste = await Aluno.findByPk(alunoId);
            const cursoExiste = await Curso.findByPk(cursoId);

            if (!alunoExiste) {
                return res.status(404).json({ error: `Aluno com ID ${alunoId} não encontrado.` });
            }
            if (!cursoExiste) {
                return res.status(404).json({ error: `Curso com ID ${cursoId} não encontrado.` });
            }
            
            // 2. Opcional: Impedir matrículas duplicadas
            const matriculaExistente = await Matricula.findOne({ where: { alunoId, cursoId } });
            
            if (matriculaExistente) {
                 return res.status(400).json({ error: `Matrícula já existe para o Aluno ${alunoId} no Curso ${cursoId}.` });
            }

            // 3. Criar a matrícula
            const matricula = await Matricula.create({ 
                alunoId, 
                cursoId,
                dataMatricula: new Date() // Seta a data atual
            });
            
            return res.status(201).json(matricula);

        } catch (error) {
            console.error(error); // Ajuda a debugar erros internos do Sequelize
            return res.status(500).json({ error: 'Erro ao criar matrícula.' });
        }
    },

    // Remove uma matrícula específica (DELETE /matriculas/:id)
    async delete(req, res) {
        const { id } = req.params;
        const deleted = await Matricula.destroy({ where: { id } });

        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ error: 'Matrícula não encontrada.' });
    }
};