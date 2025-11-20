import React, { useEffect, useState } from "react";
import "../Styles/TrabajosOrgx.css";

function TrabajosOrgx() {
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    fetch("/datos/TrabajosOrgx.json")
      .then(res => res.json())
      .then(data => setDescripcion(data.descripcion))
      .catch(err => console.error("Error cargando JSON:", err));
  }, []);

  useEffect(() => {
    setImagenes([
      "/datos/trabajo1.jpg",
      "/datos/trabajo2.jpg",
      "/datos/trabajo3.jpg",
      "/datos/trabajo4.jpg",
      "/datos/trabajo5.jpg",
      "/datos/trabajo6.jpg",
      "/datos/trabajo7.jpg"
    ]);

    setVideoUrl("/datos/videotrabajo.mp4");
  }, []);

  return (
    <div className="trabajos-root">

      <h1 className="titulo-principal">Otras habilidades adquiridas</h1>

      <div className="fila-video-texto">
        <div className="video-caja">
          {videoUrl && (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="video-ajustado"
            />
          )}
        </div>

        <div className="texto-caja">
          <p>{descripcion}</p>
        </div>
      </div>

      <h2 className="subtitulo">Galería de trabajos</h2>

      <div className="galeria-scroll">
        {imagenes.map((img, i) => (
          <div key={i} className="img-card">
            <img src={img} alt={`Trabajo ${i}`} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default TrabajosOrgx;
