import React from 'react'
import axios from 'axios';
import NavPaciente from './NavPaciente';
import Calendar from './Calendar';

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');


export const HomePaciente = () => {



    return (
        <>
            <NavPaciente />

            <section className="inicio" id="inicio">
                <img className="portada" alt="Portada de la clínica" src="/img/portada.jpeg"></img>
                <div className="textoinicio">
                    <h1>Bienvenido/a de nuevo, <span>{username}</span>
                    </h1>
                </div>
            </section>

            <section className="proximascitas" id="proximascitas">
                <h1 style={{textAlign:"center"}} >Calendario</h1>
                    <Calendar/>
            </section>

        </>
    )
}


export default HomePaciente;