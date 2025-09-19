import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Cursos() {
  const [cursos, setCursos] = useState([]);
  

  useEffect(() => {
    fetch("/datos/MisCursos.json")
      .then((res) => res.json())
      .then((data) => {
        setCursos(data);
      })
      .catch((err) => console.error("Error al cargar JSON:", err));
  }, []);

  if (!Array.isArray(cursos) || cursos.length === 0) return <div>Cargando cursos...</div>;

  return (
    <div className="CursoInfo">
      <ol>
        {cursos.map((curso, index) => (
          <li key={index} style={{marginBottom: '1rem'}}>
            <Link to={`/cursos/${index}`} style={{textDecoration: 'none'}}>
              <button >
                <strong>{curso.curso} - {curso.nombre} - {curso.semestre}</strong>  <br /> <span>{curso.descripcion}</span>
              </button>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
export default Cursos;
