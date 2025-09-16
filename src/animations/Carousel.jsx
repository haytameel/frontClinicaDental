import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

import "../styles/Carousel.css";
const DEFAULT_ITEMS = [
  {
    id: 1,
    title: "Ortodoncia",
    description: "Corregimos  tus dientes y mandíbula para mejor funcionalidad y estética.",
    image: "/img/ortodoncia.jpg",
  },
  {
    id: 2,
    title: "Implantes Dentales",
    description: "Recupera tus dientes perdidos con implantes duraderos y funcionales.",
    image: "/img/implante.png",
  },
  {
    id: 3,
    title: "Blanqueamiento Dental",
    description: "Ilumina tu sonrisa con nuestros tratamientos de blanqueamiento.",
    image: "/img/blanqueamiento.jpg",
  },
  {
    id: 4,
    title: "Limpieza Profesional",
    description: "Elimina sarro y placa para mantener tus encías sanas y tu boca fresca.",
    image: "/img/limpieza.jpeg",
  },
  {
    id: 5,
    title: "Estética Dental",
    description: "Mejora el aspecto de tu sonrisa con carillas, contorneado y más.",
    image: "/img/carillas.webp",
  },
  {
    id: 6,
    title: "Endodoncia",
    description: "Tratamientos de conducto para salvar dientes dañados o infectados.",
    image: "/img/endodoncia.webp",
  },
  {
    id: 7,
    title: "Odontopediatría",
    description: "Atención dental especializada para los más pequeños de la casa.",
    image: "/img/odontopediatria.jpg",
  },
  {
    id: 8,
    title: "Cirugía Oral",
    description: "Extracciones, injertos y otros procedimientos quirúrgicos orales.",
    image: "/img/cirugia.jpg",
  },
  {
    id: 9,
    title: "Prótesis Dentales",
    description: "Soluciones removibles o fijas para recuperar la funcionalidad de tu boca.",
    image: "/img/protesis.jpg",
  },
  {
    id: 10,
    title: "Diagnóstico Digital",
    description: "Radiografías y escáneres digitales para una atención más precisa y rápida.",
    image: "/img/radios.jpg",
  },
  {
    id: 11,
    title: "Empastes dentales",
    description: "Realización de empastes para reparar caries y restaurar dientes dañados.",
    image: "/img/empaste.webp",
  },
];


const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
    items = DEFAULT_ITEMS,
    baseWidth = 300,
    autoplay = false,
    autoplayDelay = 3000,
    pauseOnHover = false,
    loop = false,
    round = false,
}) {
    const containerPadding = 16;
    const itemWidth = baseWidth - containerPadding * 2;
    const trackItemOffset = itemWidth + GAP;

    const carouselItems = loop ? [...items, items[0]] : items;
    const [currentIndex, setCurrentIndex] = useState(0);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [isResetting, setIsResetting] = useState(false);

    const containerRef = useRef(null);
    useEffect(() => {
        if (pauseOnHover && containerRef.current) {
            const container = containerRef.current;
            const handleMouseEnter = () => setIsHovered(true);
            const handleMouseLeave = () => setIsHovered(false);
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
            return () => {
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            };
        }
    }, [pauseOnHover]);

    useEffect(() => {
        if (autoplay && (!pauseOnHover || !isHovered)) {
            const timer = setInterval(() => {
                setCurrentIndex((prev) => {
                    if (prev === items.length - 1 && loop) {
                        return prev + 1;
                    }
                    if (prev === carouselItems.length - 1) {
                        return loop ? 0 : prev;
                    }
                    return prev + 1;
                });
            }, autoplayDelay);
            return () => clearInterval(timer);
        }
    }, [
        autoplay,
        autoplayDelay,
        isHovered,
        loop,
        items.length,
        carouselItems.length,
        pauseOnHover,
    ]);

    const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

    const handleAnimationComplete = () => {
        if (loop && currentIndex === carouselItems.length - 1) {
            setIsResetting(true);
            x.set(0);
            setCurrentIndex(0);
            setTimeout(() => setIsResetting(false), 50);
        }
    };

    const handleDragEnd = (_, info) => {
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
            if (loop && currentIndex === items.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
            }
        } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
            if (loop && currentIndex === 0) {
                setCurrentIndex(items.length - 1);
            } else {
                setCurrentIndex((prev) => Math.max(prev - 1, 0));
            }
        }
    };

    const dragProps = loop
        ? {}
        : {
            dragConstraints: {
                left: -trackItemOffset * (carouselItems.length - 1),
                right: 0,
            },
        };

    return (
        <div
            ref={containerRef}
            className={`carousel-container ${round ? "round" : ""}`}
            style={{
                width: `${baseWidth}px`,
                ...(round && { height: `${baseWidth}px`, borderRadius: "50%" }),
            }}
        >
            <motion.div
                className="carousel-track"
                drag="x"
                {...dragProps}
                style={{
                    width: itemWidth,
                    gap: `${GAP}px`,
                    perspective: 1000,
                    perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
                    x,
                }}
                onDragEnd={handleDragEnd}
                animate={{ x: -(currentIndex * trackItemOffset) }}
                transition={effectiveTransition}
                onAnimationComplete={handleAnimationComplete}
            >
                {carouselItems.map((item, index) => {
                    const range = [
                        -(index + 1) * trackItemOffset,
                        -index * trackItemOffset,
                        -(index - 1) * trackItemOffset,
                    ];
                    const outputRange = [90, 0, -90];
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const rotateY = useTransform(x, range, outputRange, { clamp: false });
                    return (
                        <motion.div
                            key={index}
                            className={`carousel-item ${round ? "round" : ""}`}
                            style={{
                                width: itemWidth,
                                height: round ? itemWidth : "100%",
                                rotateY: rotateY,
                                ...(round && { borderRadius: "50%" }),
                            }}
                            transition={effectiveTransition}
                        >
                            <div className={`carousel-item-header ${round ? "round" : ""}`}>
                                <span className="carousel-icon-container">
                                      <img src={item.image} alt={item.title} className="carousel-image" />

                                </span>
                            </div>
                            <div className="carousel-item-content">
                                <div className="carousel-item-title">{item.title}</div>
                                <p className="carousel-item-description">{item.description}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
            <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
                <div className="carousel-indicators">
                    {items.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`carousel-indicator ${currentIndex % items.length === index ? "active" : "inactive"
                                }`}
                            animate={{
                                scale: currentIndex % items.length === index ? 1.2 : 1,
                            }}
                            onClick={() => setCurrentIndex(index)}
                            transition={{ duration: 0.15 }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
