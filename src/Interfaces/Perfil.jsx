import React, { useState, useEffect } from "react";

import ElderImg from "../assets/ELDER.jpg";
import "../Styles/NavBar.css";
function Inicio() {
  const [Biografia, setBiografia] = useState(null);

  useEffect(function () {
    fetch("/datos/Biografia.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setBiografia(data);
      })
      .catch(function (err) {
        console.error("Error al cargar JSON:", err);
      });
  }, []);

  if (!Biografia) {
    return <div>Cargando biografía...</div>;
  }

  return (
    <>
      <header>
        <h1>Perfil profesional</h1>
      </header>
      <main>
        <div className="Biografia-container">
          <h2>
            <img
              src={ElderImg}
              alt="Imagen tipo pasaporte del estudiante"
            />
            <aside>
              <p>{Biografia.DatosPersonales.nombre}</p>
              <p>{Biografia.DatosPersonales.cedula}</p>
              <p>{Biografia.DatosPersonales.edad}</p>
              <p>{Biografia.DatosPersonales.fechaNacimiento}</p>
              <p>{Biografia.DatosPersonales.direccion}</p>
              <p>{Biografia.DatosPersonales.email}</p>
              <p>{Biografia.DatosPersonales.numero}</p>
            </aside>
          </h2>
          <aside>Descripción: {Biografia.BiografiProfesional}</aside>
        </div>
      </main>
    </>
  );
}

export default Inicio;
