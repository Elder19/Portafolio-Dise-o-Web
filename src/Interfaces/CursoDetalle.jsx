import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../Styles/CursoDetalle.css";

function CursoDetalle() {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tipoFiltro, setTipoFiltro] = useState("Todos");

  useEffect(() => {
    fetch("/datos/MisCursos.json")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((c, idx) => String(idx) === id);
        setCurso(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (!curso) return <div>Curso no encontrado</div>;

  // Obtener tipos únicos de trabajos
  const tiposUnicos = ["Todos"];
  if (curso && curso.trabajos && curso.trabajos.length > 0) {
    curso.trabajos.forEach((trab) => {
      if (trab.tipo && !tiposUnicos.includes(trab.tipo)) {
        tiposUnicos.push(trab.tipo);
      }
    });
  }

  const handleToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  // Filtrar trabajos según tipoFiltro
  const trabajosFiltrados = (curso.trabajos || []).filter((trab) =>
    tipoFiltro === "Todos" ? true : trab.tipo === tipoFiltro
  );

  return (
    <div className="curso-detalle-container">
  <Link to="/cursos" className="curso-detalle-volver-btn">Volver a cursos</Link>
      <h2>
        {curso.curso} - {curso.nombre} - {curso.semestre}
      </h2>
      <div className="curso-detalle-filtro-container">
        <button
          id="menu-toggle"
          aria-controls="main-nav-list"
          aria-expanded={menuOpen}
          className="curso-detalle-btn"
          type="button"
          onClick={handleToggle}
        >
          Filtrar por tipo ☰
        </button>

        {menuOpen && (
          <div className="curso-detalle-filtro">
            <b>Filtrar por tipo:</b>
            <div>
              {tiposUnicos.map((tipo) => (
                <button
                  key={tipo}
                  className={`filtro-btn ${
                    tipoFiltro === tipo ? "active" : ""
                  }`}
                  onClick={() => {
                    setTipoFiltro(tipo);
                    setMenuOpen(false);
                  }}
                >
                  {tipo}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table id="curso-detalle" className="curso-detalle-table">
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
            {trabajosFiltrados.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: "center" }}>
                  No hay trabajos de este tipo.
                </td>
              </tr>
            ) : (
              trabajosFiltrados.map((trabajo, tIndex) => (
                <tr key={tIndex}>
                  <td>{trabajo.nombre}</td>
                  <td>{trabajo.tipo}</td>
                  <td>{trabajo.objetivo}</td>
                  <td>{trabajo.fecha}</td>
                  <td>
                    {trabajo.tecnologias ? trabajo.tecnologias.join(", ") : ""}
                  </td>
                  <td>
                    {trabajo.repo ? (
                      <a
                        href={trabajo.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver Repositorio
                      </a>
                    ) : (
                      "No disponible"
                    )}
                  </td>
                  <td>
                    {trabajo.sitio ? (
                      <a
                        href={trabajo.sitio}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ver Sitio
                      </a>
                    ) : (
                      "No disponible"
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CursoDetalle;
