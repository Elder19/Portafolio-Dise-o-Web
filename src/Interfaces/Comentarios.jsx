import React, { useEffect, useState } from "react";
import { getComentarios, addComentario } from "../Api/supabaseClient";
import "../Styles/Comentarios.css";


function Comentarios() {
  const [lista, setLista] = useState([]);
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargar();
  }, []);

  async function cargar() {
    try {
      const data = await getComentarios();
      setLista(data);
    } catch (err) {
      console.error("Error al cargar datos:", err);
    }
  }

  async function enviar(e) {
    e.preventDefault();

    if (!nombre.trim() || !comentario.trim()) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await addComentario(nombre, comentario);

      setNombre("");
      setComentario("");
      setMostrarModal(false);
      cargar();
    } catch (err) {
      console.error("Error al enviar comentario:", err);
    }
  }

  return (
  
  <div className="comentarios-container">

    <h2>Comentarios</h2>

    <p className="comentarios-subtitulo">
      Comparte tus comentarios sobre la colaboración con Elder en el TEC o 
      cualquier cosa que desees comentar. ¡Gracias por tu aporte!
    </p>

      <button className="btn-comentario" onClick={() => setMostrarModal(true)}>
        Dejar un comentario
      </button>

      {/* Lista con scroll */}
      <div className="comentarios-lista">
        {lista.map(item => (
          <div className="coment-card" key={item.id}>
            <strong>{item.nombre}</strong>
            <p>{item.comentario}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-content">

            <h3>Nuevo comentario</h3>

            <form onSubmit={enviar}>
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />

              <textarea
                placeholder="Tu comentario"
                value={comentario}
                onChange={e => setComentario(e.target.value)}
                rows="10"
              />

              <div className="modal-buttons">
                <button type="button" className="btn-cerrar" onClick={() => setMostrarModal(false)}>
                  Cancelar
                </button>

                <button type="submit" className="btn-enviar">
                  Enviar
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default Comentarios;
