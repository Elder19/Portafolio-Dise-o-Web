import React, { useState, useEffect } from "react";
//import "./Cursos.css"; // <-- Importa aquí tu CSS
import ElderImg from "../assets/ELDER.jpg";

function Inicio() {
  const [cursos, setCursos] = useState([]);

  useEffect(function () {
    fetch("/datos/InfoCurso.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        setCursos(data);
      })
      .catch(function (err) {
        console.error("Error al cargar JSON:", err);
      });
  }, []);

  return (
    <>
      <header>
        {/*<img src={ElderImg} alt="Imagen tipo pasaporte del estudiante" />*/}
        <h1>Portafolio</h1>
      </header>
      <main>
        {cursos.map(function (curso, index) {
          return (
            <div className="cursos-container" key={index}>
              <h2>
                {curso.curso} - {curso.nombre}
              </h2>
              <p>Semestre: {curso.semestre}</p>
              <p>Descripción: {curso.descripcion}</p>
            </div>
          );
        })}
      </main>
    </>
  );
}

export default Inicio;
