import React, { useEffect, useState } from 'react';
import './style.css'
import logoImg from '../../assets/logo.png'
import { Link, useHistory } from 'react-router-dom'
import { FiPower, FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import api from '../../services/api'
export default function Profile() {

    const userName = localStorage.getItem('userName');
    const userPhone = localStorage.getItem('userPhone');
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(0);


    const history = useHistory();

    useEffect(() => {
        api.get('rides/users/' + userPhone + '?page=' + page)
            .then(res => {
                setItems(res.data.docs);
                setPages(res.data.pages);
            })
    }, [userPhone, page]);

    // remover LocalStorage e voltar o usuário para a sessão de Logout
    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    function nextPage() {
        if ((page + 1) > pages) {
            return;
        }
        setPage(page + 1);
    }

    function previousPage() {
        if ((page - 1) < 1) {
            return;
        }
        setPage(page - 1);
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Me Leva Ai" />
                <span>Bem vindo(a), {userName}</span>
                <Link className="button" to="/running/new">
                    Cadastrar nova corrida
                </Link>
                <button onClick={handleLogout}
                    type="button">
                    <FiPower size={14} color="#E02041" />
                </button>
                <button onClick={previousPage} disabled={page === 1}>
                    <FiArrowLeft size={14} color="#E02041" />
                </button>
                <p>{page}/{pages}</p>
                <button onClick={nextPage} disabled={page === pages}>
                    <FiArrowRight size={14} color="#E02041" />
                </button>
               
            </header>
            <h1>Histórico de Corridas</h1>
            <ul>
                {items.map(props => (
                    <li key={props._id}>
                        <strong>VEÍCULO:</strong>
                        <p>{props.vehicle.licensePlate}</p>

                        <strong>ORIGEM E DESTINO:</strong>
                        <p>{props.startPlace}</p> <p>{props.finishPlace}</p>

                        <strong>DATA E HORA DE CHEGADA:</strong>
                        <p>{new Date(props.finishTime).toLocaleString('pt-br')}</p>

                        <strong>STATUS</strong>
                        <p>{props.status}</p>

                    </li>
                ))}

            </ul>


        </div>
    );
}