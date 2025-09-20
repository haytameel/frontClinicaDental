import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavPaciente from './NavPaciente';
import { DataGrid } from '@mui/x-data-grid';


function CitasPaciente() {
    const [citas, setCitas] = useState([]);
    const [peticiones, setPeticiones] = useState([]);


    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get("http://clinicadentaldocker.onrender.com/citas", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setCitas(response.data.data); // Guarda las citas en el estado
                console.log("Citas obtenidas:", response.data.data);
            })
            .catch(error => {
                console.log("Token utilizado:", token);
                console.error("Error al obtener las citas:", error);
            });
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get("http://clinicadentaldocker.onrender.com/citas/peticiones", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setPeticiones(response.data.data); // Guarda las citas en el estado
                console.log("Citas obtenidas:", response.data.data);
            })
            .catch(error => {
                console.log("Token utilizado:", token);
                console.error("Error al obtener las citas:", error);
            });
    }, []);


    //  columnas para el DataGrid citas
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'fecha', headerName: 'Fecha', flex: 1 },
        { field: 'hora', headerName: 'Desde', flex: 1 },
        { field: 'horaFin', headerName: 'Hasta', flex: 1 },
        { field: 'personal', headerName: 'Dr./Dra.', flex: 1 },
        { field: 'notas', headerName: 'Descripción', flex: 2 },
        {
            field: 'estado', headerName: 'Estado', flex: 1,
            renderCell: (params) => (
                <span
                    style={{
                        color:
                            params.value === 'PENDIENTE'
                                ? 'orange'
                                : params.value === 'CONFIRMADA'
                                    ? 'green'
                                    : 'red',
                        fontWeight: 'bold',
                    }}
                >
                    {params.value}
                </span>
            ),
        },
    ];


    // añadir un "id" único (necesario para DataGrid)
    const rows = citas.map((cita, index) => ({
        id: index + 1,
        fecha: cita.fecha,
        hora: cita.hora,
        horaFin: cita.horaFin,
        personal: cita.personal,
        notas: cita.notas,
        estado: cita.estado,
    }));


    //  columnas para el DataGrid peticiones
    const columnspeticiones = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        { field: 'fecha', headerName: 'Fecha', flex: 1 },
        { field: 'hora', headerName: 'Desde', flex: 1 },
        { field: 'horaFin', headerName: 'Hasta', flex: 1 },
        { field: 'notas', headerName: 'Descripción', flex: 2 },
        {
            field: 'estado', headerName: 'Estado', flex: 1,
            renderCell: (params) => (
                <span
                    style={{
                        color:
                            params.value === 'PENDIENTE'
                                ? 'orange'
                                : params.value === 'CONFIRMADA'
                                    ? 'green'
                                    : 'red',
                        fontWeight: 'bold',
                    }}
                >
                    {params.value}
                </span>
            ),
        },
    ];

    // añadir un "id" único (necesario para DataGrid)
    const rowspeticiones = peticiones.map((peticiones, index) => ({
        id: index + 1,
        fecha: peticiones.fecha,
        hora: peticiones.hora,
        horaFin: peticiones.horaFin,
        notas: peticiones.notas,
        estado: peticiones.estado,
    }));

    return (
        <div>
            <NavPaciente />

            <h1 style={{ textAlign: 'center', marginTop: '20px' }} >Mis Historial Completo de Citas</h1>
            {citas.length === 0 ? (
                <h2>No tienes ninguna cita registrada.</h2>
            ) : (
                <div >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10]}
                        disableSelectionOnClick
                        getRowClassName={(params) => {
                            if (params.row.estado === 'PENDIENTE') return 'fila-pendiente';
                            if (params.row.estado === 'CONFIRMADA') return 'fila-confirmada';
                            if (params.row.estado === 'FINALIZADA') return 'fila-cancelada';
                            return '';
                        }}
                        sx={{
                            backgroundColor: "#f0f8ff",
                            boxShadow: 2,
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#1976d2", // no va
                                fontWeight: "bold",
                                fontSize: "16px",
                            },
                            maxWidth: '85%',
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '0 auto',
                        }}
                    />
                </div>
            )}
            <br /> <br /> <br />
            <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Mis Historial de Peticiones</h1>
            {peticiones.length === 0 ? (
                <h2>No tienes ninguna cita registrada.</h2>
            ) : (
                <div >
                    <DataGrid
                        rows={rowspeticiones}
                        columns={columnspeticiones}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10]}
                        disableSelectionOnClick
                        getRowClassName={(params) => {
                            if (params.row.estado === 'PENDIENTE') return 'fila-pendiente';
                            if (params.row.estado === 'CONFIRMADA') return 'fila-confirmada';
                            if (params.row.estado === 'FINALIZADA') return 'fila-cancelada';
                            return '';
                        }}
                        sx={{
                            backgroundColor: "#f0f8ff",
                            boxShadow: 2,
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "#1976d2", // no va
                                fontWeight: "bold",
                                fontSize: "16px",
                            },
                            maxWidth: '85%',
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '0 auto',
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default CitasPaciente;
