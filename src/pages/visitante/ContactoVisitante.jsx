import React from 'react'
import GooeyNav from '../../animations/GooeyNav'
import '../../styles/style.css'
import { FaWhatsapp, FaInstagram, FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";
import { useState } from 'react';
import Swal from 'sweetalert2'


function SocialIcons() {
  return (
    <>
      <a href="https://wa.me/34612345678" target="_blank"><FaWhatsapp /></a>
      <a href="https://instagram.com/haytame_ea" target="_blank"><FaInstagram /></a>
      <a href="https://youtube.com/clinicahaytameel" target="_blank"><FaYoutube /></a>
      <a href='https://facebook.com/clinicahaytameel' target="_blank"><FaFacebook /></a>
      <a href='https://twitter.com/clinicahaytameel' target="_blank"><FaTwitter /></a>
    </>
  );
}


export const ContactoVisitante = () => {
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const data = {
      nombre: e.target[0].value,
      correo: e.target[1].value,
      telefono: e.target[2].value,
      asunto: e.target[3].value,
      mensaje: e.target[4].value
    };

    try {
      const response = await fetch("https://clinicadentaldocker.onrender.com/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        console.log("Mensaje enviado correctamente");
        e.target.reset();
        Swal.fire({
          title: '¡Mensaje enviado correctamente!',
          text: 'Te responderemos en la mayor brevedad posible.\nRecuerda que también puedes contactarnos por nuestras redes sociales o teléfono.\n¡Muchas gracias!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Ha ocurrido algún problema!",
          footer: '<a href="#contacto">Volver a probar</a>'
        });
      }
    } catch (error) {//caso de que no haya conexión al server...
      Swal.fire({
        icon: "error",
        title: "Error de red o timeout",
        text: error.name === "AbortError"
          ? "La conexión tardó demasiado en responder. Inténtalo nuevamente."
          : "No se pudo enviar el mensaje. Revisa tu conexión."
      });
    }

    setEnviando(false);
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Contáctanos</h1>
      <div className="contacto-container">
        <SocialIcons />
      </div>

      <form onSubmit={handleSubmit} method="POST" className="formulario" >
        <div className="campos">
          <input type="text" name="Nombre completo" required placeholder="Nombre completo"></input>
        </div>
        <div className="campos">
          <input type="email" name="Correo electrónico" required placeholder="Correo electrónico"></input>
        </div>



        <div className="campos">
          <input type="number" name="Número teléfono" placeholder="Número de teléfono" ></input>
        </div>
        <div className="campos">
          <input type="text" name="Asunto" placeholder="Asunto"></input>
        </div>

        <div className="mensaje">
          <textarea type="text" className="mensaje" name="mensaje" id="" cols="30" rows="10" required placeholder="Tu mensaje"></textarea>
        </div>

        <div className="enviar">
          <button type="submit" className="boton"
            style={{ style: "text-align: center;padding-top: 4px" }} disabled={enviando}
          >  {enviando ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    </>
  )
}

export default ContactoVisitante;

