const { Curso, Aluno } = require('../../models');

module.exports = {
    // Lista todos os cursos (GET /cursos)
    async index(req, res) {
        const cursos = await Curso.findAll({ attributes: ['id', 'nome', 'cargaHoraria', 'modalidade'] });
        return res.json(cursos);
    },

    // Detalha um curso (GET /cursos/:id)
    async show(req, res) {
        const { id } = req.params;
        // Inclui os alunos matriculados usando o alias 'alunosMatriculados'
        const curso = await Curso.findByPk(id, {
            include: [{
                model: Aluno,
                as: 'alunosMatriculados',
                attributes: ['id', 'nome', 'email']
            }]
        });

        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }
        return res.json(curso);
    },

    // Lista os alunos de um curso (GET /cursos/:cursoId/alunos)
    async listStudents(req, res) {
        const { cursoId } = req.params;
        const curso = await Curso.findByPk(cursoId, {
            attributes: ['id', 'nome'],
            include: [{
                model: Aluno,
                as: 'alunosMatriculados',
                attributes: ['id', 'nome', 'email'],
                through: { attributes: ['dataMatricula'] }
            }]
        });

        if (!curso) {
            return res.status(404).json({ error: 'Curso não encontrado.' });
        }

        return res.json({
            curso: curso.nome,
            alunos: curso.alunosMatriculados
        });
    },

    // Cria um novo curso (POST /cursos)
    async store(req, res) {
        const curso = await Curso.create(req.body);
        return res.status(201).json(curso);
    },

    // Atualiza um curso (PUT /cursos/:id)
    async update(req, res) {
        const { id } = req.params;
        const [updated] = await Curso.update(req.body, { where: { id } });

        if (updated) {
            const cursoAtualizado = await Curso.findByPk(id);
            return res.json(cursoAtualizado);
        }
        return res.status(404).json({ error: 'Curso não encontrado.' });
    },

    // Remove um curso (DELETE /cursos/:id)
    async delete(req, res) {
        const { id } = req.params;
        const deleted = await Curso.destroy({ where: { id } });

        if (deleted) {
            return res.status(204).send();
        }
        return res.status(404).json({ error: 'Curso não encontrado.' });
    }
};