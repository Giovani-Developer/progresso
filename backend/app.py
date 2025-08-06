from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

agendamentos = []
bloqueados = {}

@app.route('/agendar', methods=['POST'])
def agendar():
    data = request.get_json()
    profissional_id = data['profissional_id']
    horario = {"data": data['data'], "hora": hora['hora']}

    if horario in bloqueados.get(profissional_id, []):
        return jsonify({"erro": "Horário já ocupado"})
    
    agendamentos.append(data)

    bloqueados.setdefault(profissional_id, []).append(horario)

    return jsonify({"sucesso": True})

@app.route('/agendamentos/<usuario_id>')
def get_agendamentos(usuario_id):
    usuario_agendamentos = [a for a in agendamentos if a ['usuario_id'] ==usuario_id]
    return jsonify(usuario_agendamentos)

if __name__ == '__main__':
    app.run(debug=True)
