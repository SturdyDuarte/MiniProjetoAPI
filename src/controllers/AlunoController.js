const { Aluno, Curso } = require('../../models');

module.exports = {
    // Lista todos os alunos (GET /alunos)
    async index(req, res) {
        const alunos = await Aluno.findAll({ attributes: ['id', 'nome', 'email'] });
        return res.json(alunos);
    },

    // Detalha um aluno (GET /alunos/:id)
    async show(req, res) {
        const { id } = req.params;
        // Inclui os cursos matriculados usando o alias 'cursosMatriculados'
        const aluno = await Aluno.findByPk(id, {
            include: [{
                model: Curso,
                as: 'cursosMatriculados',
                attributes: ['id', 'nome', 'modalidade'],
                through: { attributes: ['dataMatricula'] } // Inclui a data da Matrícula
            }]
        });

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }
        return res.json(aluno);
    },

    // Lista os cursos de um aluno (GET /alunos/:alunoId/cursos)
    async listCourses(req, res) {
        const { alunoId } = req.params;
        const aluno = await Aluno.findByPk(alunoId, {
            attributes: ['id', 'nome'],
            include: [{
                model: Curso,
                as: 'cursosMatriculados',
                attributes: ['id', 'nome', 'cargaHoraria', 'modalidade'],
                through: { attributes: ['dataMatricula'] }
            }]
        });

        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado.' });
        }

        return res.json({
            aluno: aluno.nome,
            cursos: aluno.cursosMatriculados
        });
    },

    // Cria um novo aluno (POST /alunos)
    async store(req, res) {
        const { nome, email } = req.body;
        try {
            const aluno = await Aluno.create({ nome, email });
            return res.status(201).json(aluno);
        } catch (error) {
            if (error.name === 'SequelizeUniqueConstraintError') {
                return res.status(400).json({ error: 'Email já cadastrado.' });
            }
            return res.status(500).json({ error: 'Erro ao criar aluno.' });
        }
    },

    // Atualiza um aluno (PUT /alunos/:id)
    async update(req, res) {
        const { id } = req.params;
        const [updated] = await Aluno.update(req.body, { where: { id } });

        if (updated) {
            const alunoAtualizado = await Aluno.findByPk(id);
            return res.json(alunoAtualizado);
        }
        return res.status(404).json({ error: 'Aluno não encontrado.' });
    },

    // Remove um aluno (DELETE /alunos/:id)
    async delete(req, res) {
        const { id } = req.params;
        const deleted = await Aluno.destroy({ where: { id } });

        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ error: 'Aluno não encontrado.' });
    }
};