async function agendar() {
    const profissional = document.getElementById('profissional').value;
    const servico = document.getElementById('servico').value;
    const preco = document.getElementById('preco').value;
    const data = document.getElementById('data').value;
    const hora = document.getElementById('hora').value;

    const res = await fetch('http://localhost:3333/agendar', {
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
  


  /*function agendarServico(servico, preco) {
  fetch('http://localhost:3333/agendar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ servico, preco })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.mensagem); // ou exibir na tela
  })
  .catch(error => {
    console.error('Erro ao agendar:', error);
    alert('Falha ao agendar o serviço.');
  });
}
*/


    const result = await res.json();
    alert(result.sucesso ? "Agendado com sucesso!" : result.erro);
    carregarAgendamentos();
}
/*
async function carregarAgendamentos() {
    const res = await fetch('http://localhost:3333/agendamentos/1');
    const agendamentos = await res.json();
    const lista = document.getElementById('lista-agendamentos');
    lista.innerHTML = "";
    agendamentos.forEach(a => {
        const item = document.createElement('li');
        item.textContent = `${a.servico} com Profissional ${a.profissional} às ${a.hora} em ${a.data}`;
        lista.appendChild(item);
    });   
}
    */

carregarAgendamentos();