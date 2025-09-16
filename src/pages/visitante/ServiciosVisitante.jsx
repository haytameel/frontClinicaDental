import React, { useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Carousel from '../../animations/Carousel.jsx';

import "../../styles/style.css";

import TextCursor from '../../animations/TextCursor.jsx';

export const ServiciosVisitante = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    return (
        <>
            <h1 className='serviciosTitulo'>
                Nuestros servicios
                <TextCursor
                    text="🦷"
                    delay={0.01}
                    spacing={80}
                    followMouseDirection={true}
                    randomFloat={true}
                    exitDuration={0.3}
                    removalInterval={20}
                    maxPoints={10}
                />
            </h1>

            <p className='serviciosDescripcion'>
                En nuestra clínica dental, ofrecemos una amplia gama de servicios para cuidar de tu salud bucal.
                <br />
                Desde ortodoncia hasta blanqueamiento dental, nuestro equipo de profesionales está aquí para ayudarte a lograr la sonrisa que siempre has deseado.
            </p>

            <div style={{ height: '300px', position: 'relative' }}>
                <Carousel
                    autoplay={true}
                    autoplayDelay={6000}
                    pauseOnHover={true}
                    loop={true}
                    round={false}
                />
            </div>
        </>
    )
}

export default ServiciosVisitante;