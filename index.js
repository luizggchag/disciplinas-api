const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

const getDisciplinas = (request, response) => {
    pool.query('SELECT * FROM disciplinas', (error, results) => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro: ' + error
            });
        }
        response.status(200).json(results.rows)
    })
}

const addDisciplina = (request, response) => {
    const { nome } = request.body

    pool.query(
        'INSERT INTO disciplinas (nome) VALUES ($1)',
        [nome],
        (error) => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Disciplina criada.' })
        },
    )
}

const updateDisciplina = (request, response) => {
    const { codigo, nome } = request.body
    pool.query('UPDATE disciplinas set nome=$1 where codigo=$2',
        [nome, codigo ], error => {
            if (error) {
                return response.status(401).json({
                    status: 'error',
                    message: 'Erro: ' + error
                });
            }
            response.status(201).json({ status: 'success', message: 'Disciplina atualizada.' })
        })
}

const deleteDisciplina = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('DELETE FROM disciplinas where codigo = $1', [codigo], error => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro: ' + error
            });
        }
        response.status(201).json({ status: 'success', message: 'Disciplina apagada.' })
    })
}

const getDisciplinaPorID = (request, response) => {
    const codigo = parseInt(request.params.id);
    pool.query('SELECT * FROM disciplinas where codigo = $1', [codigo], (error, results) => {
        if (error) {
            return response.status(401).json({
                status: 'error',
                message: 'Erro: ' + error
            });
        }
        response.status(200).json(results.rows)
    })
}

app
    .route('/disciplinas')
    // GET endpoint
    .get(getDisciplinas)
    // POST endpoint
    .post(addDisciplina)
    // PUT
    .put(updateDisciplina)

app.route('/disciplinas/:id')
    .get(getDisciplinaPorID)
    .delete(deleteDisciplina)

// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Servidor rodando na porta 3002`)
})

