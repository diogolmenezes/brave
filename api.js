const express = require('express');
const app = express();
const path = require('path');
const uuid = require('uuid/v4');
const bodyParser = require('body-parser');

// variavel global onde ficam todas as sessions iniciadas
const sessions = [];

app.use(express.static(path.join(__dirname, 'client/build')));

// ligando o cors
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.get('/api/brave/start', (req, res, next) => {

    delete require.cache[require.resolve('./questions.json')];

    const {
        questions
    } = require('./questions.json');

    const session = {
        id: uuid(),
        currentQuestion: 0,
        questions,
        answers: [],
        createdAt: new Date()
    };

    sessions.push(session);

    res.status(200).send(session);

    next();
});

app.get('/api/brave/:id/session', (req, res, next) => {
    const session = sessions.find(session => session.id == req.params.id);

    // pega a media ponderada atualizada
    session.average = getAverage(session.answers);

    res.status(200).send(session);

    next();
});

app.post('/api/brave/:id/answer', (req, res, next) => {
    const session = sessions.find(session => session.id == req.params.id);

    const answer = req.body;

    session.answers.push(answer);

    session.currentQuestion++;

    session.average = getAverage(session.answers);

    res.status(200).send(session);

    next();
});

// Servindo as rotas não conhecidas pelo REACT
app.get('*', (req, res) => {
    if(!res.headersSent)
        res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

function getAverage(answers) {
    // calcula a media ponderada
    let average = 0;
    let weightTotal = 0;

    answers.map(question => {

        if (question.answer) {
            average += 10 * question.weight;
        }

        weightTotal += question.weight;
    });

    return average / weightTotal;
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log('Brave API is ready to listen at port ' + port);
});