import React, { useEffect, useState } from "react";
import "../Styles/Hobbies.css";

function Hobbies() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/datos/Hobbies.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Error cargando JSON:", err));
  }, []);

  if (!data) return <p>Cargando...</p>;

  return (
    <div className="cards-container">

      <h1 className="titulo-principal">Mis hobbies</h1>
      <p className="descripcion-general">
        {data.descripcionGeneral}
      </p>

      {/* --- FILA DE 3 CARDS --- */}
      <div className="cards-row">

        {/* CARD 1: VIDEO */}
        <div className="hobby-card">
          <h2 className="card-title">Video</h2>
          <video
            src={data.video}
            autoPlay
            loop
            muted
            playsInline
            className="card-video"
          />
        </div>

        {/* CARD 2: PESCA */}
        <div className="hobby-card">
          <h2 className="card-title">Pesca deportiva</h2>
          <p className="card-desc">{data.pesca.descripcion}</p>
          <div className="galeria-scroll">
            {data.pesca.imagenes.map((img, i) => (
              <img key={i} src={img} alt={`Pesca ${i}`} />
            ))}
          </div>
        </div>

        {/* CARD 3: VEHÍCULOS */}
        <div className="hobby-card">
          <h2 className="card-title">Vehículos</h2>
          <p className="card-desc">{data.vehiculos.descripcion}</p>
          <div className="galeria-scroll">
            {data.vehiculos.imagenes.map((img, i) => (
              <img key={i} src={img} alt={`Vehículo ${i}`} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Hobbies;
