import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import esLocale from '@fullcalendar/core/locales/es'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from "sweetalert2";
import NavPaciente from './NavPaciente';

export const PedirCita = () => {

    const [eventos, setEventos] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get("http://localhost:8080/citas", {
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
                        title: cita.notas || "Cita médica",
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

    const manyana = new Date();
    manyana.setDate(manyana.getDate() + 1); // sumamos 1 día

    console.log("Eventos para FullCalendar:", eventos);
    return (
        <div>
            <NavPaciente />
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>Pide Cita</h1>
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
                    nowIndicator={true}
                    // dateClick={handleDateClick}
                    eventClick={(info) => alert(`Tiene "${info.event.title}" el dia ${info.event.start.toLocaleString()}`)}
                    slotMinTime="08:00:00"
                    slotMaxTime="23:00:00"
                    //permitir seleccionar de hoy en adelante
                    //   validRange={{  start: manyana}}
                    //para seleccionar fechas
                    selectable={true}
                    select={(info) => {
                        const [fecha, horaInicio] = info.startStr.split("T");
                        const horaInicioSinZona = horaInicio.split("+")[0];

                        const [anyo, mes, dia] = fecha.split("-");
                        const fechaUE = `${dia}-${mes}-${anyo}`;
                        const [fechaFin, horaFin] = info.endStr.split("T");
                        const horaFinSinZona = horaFin.split("+")[0];

                        Swal.fire({
                            title: "¿Quieres una cita para el siguiente día y hora?     ",
                            html: `
                             <b>Fecha:</b> ${fechaUE}<br><b>Hora:</b> ${horaInicioSinZona}
                             <br></br>
                            <h2>Rellena los siguientes datos</h2>
                            
                           
                                <select id="tipo" class="swal2-select">
      <option value="ORTODONCIA">Ortodoncia (60 min)</option>
      <option value="EMPASTE">Empaste (45 min)</option>
      <option value="IMPLANTES_DENTALES">Implantes (90 min)</option>
      <option value="BLANQUEAMIENTO_DENTAL">Blanqueamiento (45 min)</option>
      <option value="LIMPIEZA_PROFESIONAL">Limpieza profesional (30 min)</option>
      <option value="ESTETICA_DENTAL">Estética dental (60 min)</option>
      <option value="ENDODONCIA">Endodoncia (75 min)</option>
      <option value="ODONTOPEDIATRIA">Odontopediatría (40 min)</option>
      <option value="CIRUGIA_ORAL">Cirugía oral (120 min)</option>
      <option value="PROTESIS_DENTALES">Prótesis dentales (60 min)</option>
      <option value="DIAGNOSTICO_DIGITAL">Diagnóstico (o primera visita) (20 min)</option>
    </select>

        <textarea id="notas" class="swal2-textarea" placeholder="Notas u Observaciones"></textarea>

                             <br><br>`,
                            icon: "question",
                            focusConfirm: false,//que el cursor no se ponga en el boton de confirmar automaticamente
                            confirmButtonText: "¡Si, la quiero!",
                            cancelButtonText: "No, gracias",
                            showCancelButton: true,
                            preConfirm: () => {
                                const tipo = Swal.getPopup().querySelector('#tipo').value;
                                const notas = Swal.getPopup().querySelector('#notas').value;
                                const estado = "PENDIENTE"
                                if (!tipo) {
                                    Swal.showValidationMessage(`Por favor, elige un tipo de cita`);
                                }
                                if (!notas) {
                                    Swal.showValidationMessage(`Por favor, añade anotaciones u observaciones.`);
                                }
                                return { tipo: tipo, notas: notas, estado: estado }
                            }
                        }).then((result) => {
                            if (result.isDismissed) {
                                Swal.fire("Cita no registrada", "No se ha guardado ninguna cita", "error");
                                return;
                            }
                            if (result.isConfirmed && new Date(fecha) > new Date()) {
                                const nuevaCita = result.value;
                                const token = localStorage.getItem('token');
                                const user = localStorage.getItem('username');
                                const citaParaBackend = {
                                    fecha: fecha,           // fecha en formato yyyy-mm-dd
                                    hora: horaInicioSinZona,  // hora de inicio
                                    horaFin: horaFinSinZona,  // hora de fin, aunque habria que calcularla posteriormente
                                    tipo: nuevaCita.tipo,
                                    notas: nuevaCita.notas,
                                    estado: nuevaCita.estado,  // "PENDIENTE" lo tenemos por defecto
                                    username: user  // usuario del paciente que pide la cita
                                };
                                axios.post("http://localhost:8080/citas/solicitar", citaParaBackend, {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                })
                                    .then(response => {
                                        console.log("Cita guardada con éxito:", response.data.data);
                                        Swal.fire("Cita enviada", "Tu cita ha sido enviada para ser revisada, pronto recibirás una confirmación.", "success");

                                        //aunque al refrescar se perderia...
                                        setEventos(prev => [...prev, {
                                            title: `Pendiente: ${nuevaCita.tipo}`,
                                            start: `${anyo}-${mes}-${dia}T${horaInicioSinZona}`,
                                            end: `${anyo}-${mes}-${dia}T${horaFinSinZona}`,
                                            color: "orange",
                                            textColor: "black"
                                        }]);


                                    })
                                    .catch(error => {
                                        console.error("Error al guardar la cita:", error);
                                        Swal.fire("Error", "No se pudo enviar la cita", "error");

                                    });
                                console.log("Nueva cita a enviar:", nuevaCita);


                            }
                            else if (result.isConfirmed && new Date(fecha) <= new Date()) {
                                Swal.fire("Error", "No se puede pedir una cita para hoy o días pasados", "error");
                            }
                        })
                            .catch((error) => {
                                console.error(error);
                                Swal.fire("Error", "No se pudo guardar la cita", "error");
                            });

                    }

                    }




                />
            </div>
        </div>

    )
}

export default PedirCita;