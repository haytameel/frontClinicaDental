import React, { useState, useEffect } from "react";
import axios from "axios";
import NavPaciente from './NavPaciente';
import { Card, CardContent, Typography, Avatar, Grid } from "@mui/material";

export const MiPerfilPaciente = () => {
  const [perfil, setPerfil] = useState({
    username: "",
    password: "",
    rol: "PACIENTE",
    id: "",
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    genero: "",
    fechaNacimiento: "",
    direccion: "",
    codigoPostal: "",
    seguroDental: false,
    numSeguro: "",
    notas: ""
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const token = localStorage.getItem("token");
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    axios.get("https://clinicadentaldocker.onrender.com/paciente/miperfil")
      .then((response) => {
        setPerfil(response.data.data);
        setSuccessMsg("Perfil encontrado con éxito.");
      })
      .catch((error) => {
        setErrorMsg(`Error. ${error.response?.data || error.message}. Inténtalo de nuevo.`);
      });
  }, []);

  return (
    <div>
      <section className="inicio" id="inicio">
        <NavPaciente />
      </section>

      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Mi Perfil Paciente</h1>
      {errorMsg && <p style={{ color: "red", fontSize: '20px' }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green", fontSize: '20px' }}>{successMsg}</p>}

      <Card style={{ maxWidth: 700, margin: "2rem auto", backgroundColor: "#f5f5f5" }}>
        <CardContent>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
            <Avatar sx={{ width: 64, height: 64 }}>P</Avatar>
            <Typography variant="h5" sx={{ marginLeft: "1rem" }}>Mi Perfil Paciente</Typography>
          </div>

          <Grid container spacing={2}>
            <Grid item xs={6}><b>Nombre:</b> {perfil.nombre}</Grid>
            <Grid item xs={6}><b>Apellidos:</b> {perfil.apellidos}</Grid>
            <Grid item xs={6}><b>Email:</b> {perfil.email}</Grid>
            <Grid item xs={6}><b>Teléfono:</b> {perfil.telefono}</Grid>
            <Grid item xs={6}><b>Dirección:</b> {perfil.direccion}</Grid>
            <Grid item xs={6}><b>Código Postal:</b> {perfil.codigoPostal}</Grid>
            <Grid item xs={6}><b>Seguro Dental:</b> {perfil.seguroDental ? "Sí" : "No"}</Grid>
            <Grid item xs={6}><b>Número de Seguro:</b> {perfil.numSeguro}</Grid>
            <Grid item xs={12}><b>Notas:</b> {perfil.notas}</Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default MiPerfilPaciente;




{/*
    
    import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import NavPaciente from './NavPaciente';
import { Card, CardContent, Typography, Avatar, Grid } from "@mui/material";

export const MiPerfilPaciente = () => {
    const [perfil, setPerfil] = useState({
        username: "",
        password: "",
        rol: "PACIENTE",
        id: "",
        nombre: "",
        apellidos: "",
        email: "",
        telefono: "",
        genero: "",
        fechaNacimiento: "",
        direccion: "",
        codigoPostal: "",
        seguroDental: false,
        numSeguro: "",
        notas: ""
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");


    const token = localStorage.getItem("token");

    console.log("Token recuperado del localStorage:", token);

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    useEffect(() => {
        axios
            .get("https://clinicadentaldocker.onrender.com/paciente/miperfil")
            .then((response) => {
                console.log("Response completa:", response);
                console.log("Solo data:", response.data);
                console.log("Solo paciente:", response.data.data);

                setPerfil(response.data.data);
                setSuccessMsg("Perfil encontrado con éxito.");

            })
            .catch((error) => {
                setErrorMsg(`Error.  \t  ${error.response.data}. Inténtalo de nuevo.`);
                console.error("Error al recuperar el perfil:", error.response);
            });
    }, []); // [] para que se ejecute solo una vez al montar el componente


    return (
        <div>
            <section className="inicio" id="inicio">
                < NavPaciente />
            </section>
            <h1 style={{textAlign:'center', marginTop:'20px'}}>Mi Perfil Paciente</h1>
            {errorMsg && <p style={{ color: "red", fontSize:'20px'}}>{errorMsg}</p>}
            {successMsg && <p style={{ color: "green", fontSize:'20px'}}>{successMsg}</p>}
            <ul>
                <li><b>Nombre:</b> {perfil.nombre}</li>
                <li><b>Apellidos:</b> {perfil.apellidos}</li>
                <li><b>Email:</b> {perfil.email}</li>
                <li><b>Teléfono:</b> {perfil.telefono}</li>
                <li><b>Dirección:</b> {perfil.direccion}</li>
                <li><b>Código Postal:</b> {perfil.codigoPostal}</li>
                <li><b>Seguro Dental:</b> {perfil.seguroDental ? "Sí" : "No"}</li>
                <li><b>Número de Seguro:</b> {perfil.numSeguro}</li>
                <li><b>Notas:</b> {perfil.notas}</li>
            </ul>
        </div>
    )
}

export default MiPerfilPaciente;
    
    
    
    */}