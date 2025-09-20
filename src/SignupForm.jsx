import React, { useState } from "react";
import axios from "axios";
import "./styles/signup.css";

export const SignupForm = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setErrorMsg("");
    setSuccessMsg("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://clinicadentaldocker.onrender.com/api/auth/signup", formData)
      .then((response) => {
        console.log("Usuario registrado:", response.data);
        setSuccessMsg("Cuenta creada con éxito. \t Ahora puedes iniciar sesión.");
        setFormData({
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
          seguroDental: "",
          numSeguro: "",
          notas: ""
        });
      })
      .catch((error) => {
        setErrorMsg(`Error.  \t  ${error.response.data}. Inténtalo de nuevo.`);

        console.error("Error en el registro:", error.response);
      });
  };

  return (
    <div className="signup-page">
      <div className="signup-izq">
        <h1>
          <span>¡Únete a</span> nuestra clínica!
        </h1>
      </div>

      <div className="signup-der">
        <form onSubmit={handleSubmit}>
          <h2>Regístrate <span></span> como Paciente</h2>

          {errorMsg && (
            <div style={{ color: "red", marginBottom: "1rem", fontWeight: "bold" }}>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div style={{ color: "green", marginBottom: "1rem", fontWeight: "bold" }}>
              {successMsg}
            </div>
          )}

          <div className="izquierda">
            <input
              name="username"
              placeholder="Usuario"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="derecha">
            <input
              name="id"
              placeholder="DNI"
              value={formData.id}
              onChange={handleChange}
              required
            />

            <input
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />

            <input
              name="apellidos"
              placeholder="Apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={formData.telefono}
              onChange={handleChange}
            />

            <select
              id="genero"
              name="genero"
              value={formData.genero}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Elige Género
              </option>
              <option value="F">Mujer</option>
              <option value="M">Hombre</option>
            </select>

            <input
              type="date"
              id="fecha_nacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              id="direccion"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleChange}
              maxLength="255"
              required
            />

            <input
              type="text"
              id="codigo_postal"
              name="codigoPostal"
              placeholder="Código Postal"
              value={formData.codigoPostal}
              onChange={handleChange}
              maxLength="10"
              required
            />

            <label htmlFor="seguro_dental">¿Tiene seguro dental?</label>
            <input
              type="checkbox"
              id="seguro_dental"
              name="seguroDental"
              checked={formData.seguroDental}
              onChange={handleChange}
            />

            <input
              type="text"
              id="num_seguro"
              name="numSeguro"
              placeholder="Número del seguro"
              value={formData.numSeguro}
              onChange={handleChange}
              maxLength="255"
            />


          </div>

          <textarea
            className="notas"
            name="notas"
            placeholder="Alergias u observaciones"
            value={formData.notas}
            onChange={handleChange}
          />
          <button className="boton" type="submit">
            CREAR CUENTA
          </button>

          <div>
            <h5 style={{ fontSize: "1.5rem", marginTop: "1rem" }}>
              ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
            </h5>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
