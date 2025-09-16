import React from 'react'
import ServiciosVisitante from './ServiciosVisitante.jsx'
import ContactoVisitante from './ContactoVisitante.jsx'
import InicioVisitante from './InicioVisitante.jsx'
import AboutusVisitante from './AboutusVisitante.jsx'
import FooterVisitante from './FooterVisitante.jsx'
export const HomeVisitante = () => {
    return (
        <>
            <section className="inicio" id="inicio">
                < InicioVisitante />
            </section>

            <section className="servicios" id="servicios">
                < ServiciosVisitante />
            </section>

            <section className="aboutus" id="aboutus">
                < AboutusVisitante />
            </section>

            <section className="contacto" id="contacto">
                < ContactoVisitante />
            </section>

            <footer className="footer" id="footer">
                < FooterVisitante />
            </footer>
            
        </>
    )
}

export default HomeVisitante;

