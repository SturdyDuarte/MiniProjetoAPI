const express = require('express');
const routes = express.Router();

// Importar os Controllers
const AlunoController = require('./controllers/AlunoController');
const CursoController = require('./controllers/CursoController');
const MatriculaController = require('./controllers/MatriculaController');

// ===================================
// ROTA DE TESTE (Para resolver o "Cannot GET /")
// ===================================
routes.get('/', (req, res) => {
    return res.json({ 
        message: "API rodando com sucesso!",
        endpoints: ["/alunos", "/cursos", "/matriculas"]
    });
});

// ===================================
// 5.1 Alunos (CRUD e Associações)
// ===================================
routes.get('/alunos', AlunoController.index);               // GET /alunos
routes.get('/alunos/:id', AlunoController.show);             // GET /alunos/:id
routes.post('/alunos', AlunoController.store);               // POST /alunos
routes.put('/alunos/:id', AlunoController.update);           // PUT /alunos/:id
routes.delete('/alunos/:id', AlunoController.delete);        // DELETE /alunos/:id

// Endpoint de listagem de Cursos por Aluno
routes.get('/alunos/:alunoId/cursos', AlunoController.listCourses); // GET /alunos/:id/cursos

// ===================================
// 5.2 Cursos (CRUD e Associações)
// ===================================
routes.get('/cursos', CursoController.index);               // GET /cursos
routes.get('/cursos/:id', CursoController.show);             // GET /cursos/:id
routes.post('/cursos', CursoController.store);               // POST /cursos
routes.put('/cursos/:id', CursoController.update);           // PUT /cursos/:id
routes.delete('/cursos/:id', CursoController.delete);        // DELETE /cursos/:id

// Endpoint de listagem de Alunos por Curso
routes.get('/cursos/:cursoId/alunos', CursoController.listStudents); // GET /cursos/:id/alunos

// ===================================
// 5.3 Matrículas (Criação e Remoção)
// ===================================
routes.post('/matriculas', MatriculaController.store);        // POST /matriculas
routes.delete('/matriculas/:id', MatriculaController.delete);  // DELETE /matriculas/:id (Opcional)

module.exports = routes;