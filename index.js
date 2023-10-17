const express = require('express');
const server = express();
const PORT = 3000;

const resultados = {
    pessoas: [{ id: 1, nome: "Marcelo" }, { id: 2, nome: "João" }, { id: 3, nome: "Maria" }],
    carros: [{ id: 1, modelo: "Fusca" }, { id: 2, modelo: "Gol" }, { id: 3, modelo: "Palio" }],
    animais: [{ id: 1, nome: "Cachorro" }, { id: 2, nome: "Gato" }, { id: 3, nome: "Papagaio" }]
};

//Retorna todo o objeto RESULTADO e suas categorias:
//http://localhost:3000/resultados

server.get('/resultados', (req, res) => {
    res.json(resultados);
});

//Retora todos os itens de uma catégoria especifica:
//http://localhost:3000/pessoas
//http://localhost:3000/carros
//http://localhost:3000/animais

server.get('/:categoria', (req, res) => {
    const categoria = req.params.categoria;

    if (!resultados[categoria]) {
        res.status(404).send('Categoria não encontrada');
        return;
    }

    res.json(resultados[categoria]);
});

//Retona um item expecifico de uma categoria atraves do id:
//http://localhost:3000/pessoas/id
//http://localhost:3000/carros/id
//http://localhost:3000/animais/id

server.get('/:categoria/:id', (req, res) => {
    const categoria = req.params.categoria;
    const id = parseInt(req.params.id, 10);

    if (!resultados[categoria]) {
        res.status(404).send('Categoria não encontrada');
        return;
    }

    const objeto = resultados[categoria].find(item => item.id === id);

    if (objeto) {
        res.json(objeto);
    } else {
        res.status(404).send('Objeto não encontrado na categoria especificada');
    }
});

server.listen(PORT, () => {
    console.log(`Rodadando na porta -->  http://localhost:${PORT}`);
});
