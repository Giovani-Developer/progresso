async function agendar() {
    const profissional = document.getElementById('profissional').value;
    const servico = document.getElementById('servico').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    const res = await fetch('http://localhost:5000/agendar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            usuario_id: "1",
            profissional_id: profissional,
            servico,
            data,
            hora
        })
    });

    const result = await res.json();
    alert(result.sucesso ? "Agendado com sucesso!" : result.erro);
    carregarAgendamentos();
}

async function carregarAgendamentos() {
    const res = await fetch('http://localhost:5000/agendamentos/1');
    const agendamentos = await res.json();
    const lista = document.getElementById('lista-agendamentos');
    lista.innerHTML = "";
    agendamentos.forEach(a => {
        const item = document.createElement('li');
        item.textContent = `${a.servico} com Profissional ${a.profissional} às ${a.hora} em ${a.data}`;
        lista.appendChild(item);
    });   
}

carregarAgendamentos();