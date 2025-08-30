import React, { useState, useEffect } from "react";

function Cursos() {
  const [cursos, setCursos] = useState([]);
  const [cursoP, setCursoP] = useState(0);

  useEffect(() => {
    fetch("/datos/MisCursos.json")
      .then((res) => res.json())
      .then((data) => {
        setCursos(data);
      })
      .catch((err) => console.error("Error al cargar JSON:", err));
  }, []);

  if (cursos.length === 0) return <div>Cargando cursos...</div>;
  const cursoActual = cursos[cursoP];

  const HandleAnterior = () => {
    setCursoP((prev) => (prev === 0 ? cursos.length - 1 : prev - 1));
  };
  const HandleSiguiente = () => {
    setCursoP((prev) => (prev === cursos.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <header className="CursoInfo">
        <button onClick={HandleAnterior}>Anterior</button>
        <h2>
          {cursoActual.curso} - {cursoActual.nombre}
        </h2>
        <p>{cursoActual.descripcion}</p>
        <p>Semestre: {cursoActual.semestre}</p>
        <button onClick={HandleSiguiente}>Siguiente</button>
      </header>
      <main>  
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Objetivo</th>
              <th>Fecha</th>
              <th>Tecnologías</th>
              <th>Repositorio</th>
              <th>Sitio</th>
            </tr>
          </thead>
          <tbody>
            {cursoActual.trabajos.map((trabajo, index) => (
              <tr key={index}>
                <td>{trabajo.nombre}</td>
                <td>{trabajo.tipo}</td>
                <td>{trabajo.objetivo}</td>
                <td>{trabajo.fecha}</td>
                <td>{trabajo.tecnologias.join(", ")}</td>
                <td>
                  {trabajo.repo ? (
                    <a href={trabajo.repo} target="_blank" rel="noopener noreferrer">
                      Ver Repositorio
                    </a>
                  ) : (
                    "No disponible"
                  )}
                </td>
                <td>
                  {trabajo.sitio ? (
                    <a href={trabajo.sitio} target="_blank" rel="noopener noreferrer">
                      Ver Sitio
                    </a>
                  ) : (
                    "No disponible"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
    
  );
}
export default Cursos;
