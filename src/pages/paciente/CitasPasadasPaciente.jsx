import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavPaciente from './NavPaciente';
import { DataGrid } from '@mui/x-data-grid';



export const CitasPasadasPaciente = () => {
    const [citas, setCitas] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get("http://localhost:8080/citas/pasadas", {
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

    return (
        <div>
            <NavPaciente />

            <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Mis Citas Pasadas</h1>
            {citas.length === 0 ? (
                <h3>No has tenido ninguna cita anteriormente.</h3>
            ) : (
                <div>
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
        </div>
    );

}


export default CitasPasadasPaciente;