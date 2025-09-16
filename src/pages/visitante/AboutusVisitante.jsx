import React from 'react'
import ProfileCard from '../../animations/ProfileCard.jsx'
import Carousel from '../../animations/Carousel.jsx'
import '../../styles/style.css'
export const AboutusVisitante = () => {
    return (
        <>

            <h1 style={{ textAlign: 'center' }}>
                Nuestro <span>equipo</span>
            </h1>






            <div className="projects">
                <div className="caja">
                    <ProfileCard
                        name="Dra. Laura Martínez"
                        title="Ortodoncista"
                        description="Especialista en ortodoncia   invisible y brackets para adultos"
                        handle="dralauram"
                        status="Activa"
                        contactText="Contáctame"
                        avatarUrl="./img/dralaura.jpg"
                        iconUrl="./img/dralaura.jpg"
                        showUserInfo={true}
                        innerGradient="none"
                        enableTilt={true}
                        onContactClick={() => {
                            window.open("https://wa.me/34612345678", "_blank");
                        }}

                    />
                </div>
                <div className="caja">
                    <ProfileCard
                        name="Dr. Javier Gómez"
                        title="Cirujano dental"
                        description="Apasionado por la precisión quirúrgica, lidera los tratamientos de implantología con tecnología de última generación."
                        handle="drjavigo"
                        status="Activa"
                        contactText="Contáctame"
                        avatarUrl="./img/drjavier.jpg"
                        iconUrl="./img/drjavier.jpg"
                        showUserInfo={true}
                        innerGradient="none"
                        enableTilt={true}
                        onContactClick={() => {
                            window.open("https://wa.me/34612345678", "_blank");
                        }}

                    />
                </div>
                <div className="caja">                    <ProfileCard
                    name="Dra. Carmen Ríos"
                    title="Odontopediatra"
                    description="Su trato amable y paciente hace que los más pequeños se sientan cómodos desde el primer día."
                    handle="dracarmen"
                    status="Activa"
                    contactText="Contáctame"
                    avatarUrl="./img/dracarmen.jpg"
                    iconUrl="./img/dracarmen.jpg"
                    showUserInfo={true}
                    innerGradient="none"
                    enableTilt={true}
                    onContactClick={() => {
                        window.open("https://wa.me/34612345678", "_blank");
                    }}
                />

                </div>
                <div className="caja">                    <ProfileCard
                    name="Dra. Helena Duarte"
                    title="Estética dental"
                    description="Combina arte y técnica para transformar sonrisas, cuidando cada detalle estético."
                    handle="drahelena"
                    status="Activa"
                    contactText="Contáctame"
                    avatarUrl="./img/drahelena.jpg"
                    iconUrl="./img/drahelena.jpg"
                    showUserInfo={true}
                    innerGradient="none"
                    enableTilt={true}
                    onContactClick={() => {
                        window.open("https://wa.me/34612345678", "_blank");
                    }}
                />

                </div>
                <div className="caja">                    <ProfileCard
                    name="Luis Ortega"
                    title="Higienista dental"
                    description="Encargado de promover la salud bucal diaria con un enfoque educativo y preventivo."
                    handle="luisortega"
                    status="Activo"
                    contactText="Contáctame"
                    avatarUrl="./img/luisortega.jpg"
                    iconUrl="./img/luisortega.jpg"
                    showUserInfo={true}
                    innerGradient="none"
                    enableTilt={true}
                    onContactClick={() => {
                        window.open("https://wa.me/34612345678", "_blank");
                    }}
                />

                </div>
                <div className="caja">                    <ProfileCard
                    name="Marina Torres"
                    title="Auxiliar de clínica"
                    description="Su eficiencia y trato cercano aseguran una experiencia cómoda y segura para todos los pacientes."
                    handle="matorres"
                    status="Activa"
                    contactText="Contáctame"
                    avatarUrl="./img/marinatorres.jpg"
                    iconUrl="./img/marinatorres.jpg"
                    showUserInfo={true}
                    innerGradient="none"
                    enableTilt={true}
                    onContactClick={() => {
                        window.open("https://wa.me/34612345678", "_blank");
                    }}
                />

                </div>
                <div className="caja">                    <ProfileCard
                    name="Sandra Morales"
                    title="Recepcionista / Atención al paciente"
                    description="Es la primera sonrisa que verás al llegar, siempre dispuesta a ayudarte"
                    handle="samorales"
                    status="Activa"
                    contactText="Contáctame"
                    avatarUrl="./img/sandramorales.jpg"
                    iconUrl="./img/sandramorales.jpg"
                    showUserInfo={true}
                    innerGradient="none"
                    enableTilt={true}
                    onContactClick={() => {
                        window.open("https://wa.me/34612345678", "_blank");
                    }}
                />

                </div>

            </div>


        </>
    )
}

export default AboutusVisitante;
