import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import esLocale from '@fullcalendar/core/locales/es'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from "sweetalert2";



export default function Calendar() {
    const handleDateClick = (arg) => {
        alert(arg.dateStr)
    }

    const [eventos, setEventos] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get("https://clinicadentaldocker.onrender.com/citas", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const citasBackend = response.data.data;

                console.log("Citas obtenidas:", citasBackend);
                // transformamos las citas del backend al formato que necesita FullCalendar
                const eventosFormateados = citasBackend.map(cita => {
                    const [dia, mes, anyo] = cita.fecha.split("-");
                    const fechaISO = `${anyo}-${mes}-${dia}`;

                    return {

                        title: cita.notas || "Cita",
                        start: `${fechaISO}T${cita.hora}`,
                        end: `${fechaISO}T${cita.horaFin}`,
                        color: "#51d492",
                        textColor: "black"
                    };
                })

                setEventos(eventosFormateados);
            })
            .catch(error => {
                console.error("Error al obtener las citas:", error);
            });
    }, []);


    console.log("Eventos para FullCalendar:", eventos);
    return (
        <div style={{ backgroundColor: "#305c6d", padding: "10px", borderRadius: "12px" }}>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                allDaySlot={false}
                headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,dayGridWeek,dayGridDay' }}
                weekends={true}
                eventBackgroundColor='#8CE7F2'
                eventTextColor='green'
                eventBorderColor='red'
                events={eventos}
                locales={[esLocale]}
                locale="es"
                editable={false}
                //para seleccionar fechas
                selectable={false}

                nowIndicator={true}
                // dateClick={handleDateClick}
                eventClick={(info) => alert(`Tienes "${info.event.title}" el dia ${info.event.start.toLocaleString()}`)}
                slotMinTime="08:00:00"
                slotMaxTime="23:00:00"


            />
        </div>
    )
}

