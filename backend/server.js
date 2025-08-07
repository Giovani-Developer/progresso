const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3333;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Simulação de banco de dados
let agendamentos = [];

const salvarDados = () => {
    fs.writeFileSync('agendamentos.json', JSON.stringify(agendamentos, null, 2));
};

// Carrega os agendamentos do arquivo ao iniciar
if (fs.existsSync('agendamentos.json')) {
    agendamentos = JSON.parse(fs.readFileSync('agendamentos.json'));
}

app.post('/agendar', (req, res) => {
    const { usuario_id, profissional_id, servico, data, hora } = req.body;

    const jaAgendado = agendamentos.find(a =>
        a.profissional_id === profissional_id &&
        a.data === data &&
        a.hora === hora
    );

    if (jaAgendado) {
        return res.json({ sucesso: false, erro: 'Horário já reservado!' });
    }

    const novoAgendamento = {
        usuario_id,
        profissional_id,
        servico,
        data,
        hora
    };

    agendamentos.push(novoAgendamento);
    salvarDados();

    return res.json({ sucesso: true });
});

app.get('/agendamentos/:usuario_id', (req, res) => {
    const { usuario_id } = req.params;
    const agendamentosUsuario = agendamentos
        .filter(a => a.usuario_id === usuario_id)
        .map(a => ({
            servico: a.servico,
            profissional: a.profissional_id,
            data: a.data,
            hora: a.hora
        }));

    return res.json(agendamentosUsuario);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
