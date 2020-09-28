import React from 'react';
import './style.css';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
export default function RequestRide(props) {
  // criando os estados para manipular os inputs
  const history = useHistory();

  const newHour = newHourRandom(new Date(2020, 0, 1));

  function newHourRandom(date) {
    var atualDate = new Date();
    var localDate = new Date(
      date.getTime() + Math.random() * (atualDate.getTime() - date.getTime())
    );
    return localDate.getHours() + ':' + localDate.getMinutes();
  }

  async function handleRegister(event) {
    event.preventDefault();

    const data = { type: 'start' };

    try {
      const res = await api.patch('rides/' + props.location.state.id, data);
      history.push('/ride/status', res.data);
    } catch (err) {
      //alert(err.response.data);
      alert('Erro ao solicitar corrida!');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Me Leva Ai" />
          <h1>Iniciando Corrida</h1>
          <p>
            Valide seu veículo e verifique a previsão de chegada no Me Leva Aí!.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Histórico de Corridas
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Veículo"
            value={props.location.state.vehicle.licensePlate}
            disabled={true}
          />
          <input
            type="Previsão de Chegada"
            placeholder="Previsão de Chegada"
            value={newHour}
            disabled={true}
          />
          <input
            placeholder="Status"
            value={'AGUARDANDO INICIAR'}
            disabled={true}
          />

          <button className="button" type="submit">
            Iniciar Corrida
          </button>
        </form>
      </div>
    </div>
  );
}
