const express = require('express');
const routes = require('./routes');
const db = require('../models'); // Garante que a conexão com o DB e as associações sejam carregadas

const app = express();

// Middleware necessário para ler o corpo da requisição em JSON
app.use(express.json());

// Carregar as rotas
app.use(routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});