import { useState } from "react";
import {
  CalendarDays,
  Clock,
  Stethoscope,
  Check,
  X,
  Pencil,
  Trash2,
} from "lucide-react";

function Citas({ pacientes, citas, setCitas }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [citaEditando, setCitaEditando] = useState(null);

  const [nuevaCita, setNuevaCita] = useState({
    paciente: "",
    fecha: "",
    hora: "",
    tratamiento: "",
    observaciones: "",
  });

  function manejarCambio(e) {
    const { name, value } = e.target;

    setNuevaCita({
      ...nuevaCita,
      [name]: value,
    });
  }

  function registrarCita(e) {
    e.preventDefault();

    const cita = {
      id: Date.now(),
      paciente: nuevaCita.paciente,
      fecha: nuevaCita.fecha,
      hora: nuevaCita.hora,
      tratamiento: nuevaCita.tratamiento,
      observaciones: nuevaCita.observaciones,
      estado: "pendiente",
    };

    setCitas([
      ...citas,
      cita,
    ]);

    limpiarFormulario();
  }

  function editarCita(cita) {
    setCitaEditando(cita);

    setNuevaCita({
      paciente: cita.paciente,
      fecha: cita.fecha,
      hora: cita.hora,
      tratamiento: cita.tratamiento,
      observaciones: cita.observaciones,
    });

    setMostrarFormulario(true);
  }

  function actualizarCita(e) {
    e.preventDefault();

    const citasActualizadas = citas.map((cita) => {
      if (cita.id === citaEditando.id) {
        return {
          ...cita,
          paciente: nuevaCita.paciente,
          fecha: nuevaCita.fecha,
          hora: nuevaCita.hora,
          tratamiento: nuevaCita.tratamiento,
          observaciones: nuevaCita.observaciones,
        };
      }

      return cita;
    });

    setCitas(citasActualizadas);

    limpiarFormulario();
  }

  function eliminarCita(id) {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar esta cita?"
    );

    if (!confirmar) {
      return;
    }

    const citasActualizadas = citas.filter(
      (cita) => cita.id !== id
    );

    setCitas(citasActualizadas);
  }

  function cambiarEstado(id, nuevoEstado) {
    const citasActualizadas = citas.map((cita) => {
      if (cita.id === id) {
        return {
          ...cita,
          estado: nuevoEstado,
        };
      }

      return cita;
    });

    setCitas(citasActualizadas);
  }

  function limpiarFormulario() {
    setNuevaCita({
      paciente: "",
      fecha: "",
      hora: "",
      tratamiento: "",
      observaciones: "",
    });

    setCitaEditando(null);
    setMostrarFormulario(false);
  }

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>Citas</h1>

          <p>
            Gestiona las citas de Girald-Dent
          </p>
        </div>

        <button
          className="new-appointment"
          onClick={() => {
            setCitaEditando(null);

            setNuevaCita({
              paciente: "",
              fecha: "",
              hora: "",
              tratamiento: "",
              observaciones: "",
            });

            setMostrarFormulario(true);
          }}
        >
          + Nueva cita
        </button>

      </div>

      {mostrarFormulario && (
        <div className="form-container">

          <h2>
            {citaEditando
              ? "Editar cita"
              : "Registrar nueva cita"}
          </h2>

          <form
            onSubmit={
              citaEditando
                ? actualizarCita
                : registrarCita
            }
          >

            <select
              name="paciente"
              value={nuevaCita.paciente}
              onChange={manejarCambio}
              required
            >
              <option value="">
                Seleccionar paciente
              </option>

              {pacientes.map((paciente) => (
                <option
                  key={paciente.id}
                  value={paciente.nombre}
                >
                  {paciente.nombre}
                </option>
              ))}
            </select>

            <input
              type="date"
              name="fecha"
              value={nuevaCita.fecha}
              onChange={manejarCambio}
              required
            />

            <input
              type="time"
              name="hora"
              value={nuevaCita.hora}
              onChange={manejarCambio}
              required
            />

            <input
              type="text"
              name="tratamiento"
              placeholder="Tratamiento"
              value={nuevaCita.tratamiento}
              onChange={manejarCambio}
              required
            />

            <textarea
              name="observaciones"
              placeholder="Observaciones"
              value={nuevaCita.observaciones}
              onChange={manejarCambio}
            />

            <div>

              <button type="submit">
                {citaEditando
                  ? "Guardar cambios"
                  : "Guardar cita"}
              </button>

              <button
                type="button"
                onClick={limpiarFormulario}
              >
                Cancelar
              </button>

            </div>

          </form>

        </div>
      )}

      <div className="appointments-page">

        {citas.length === 0 ? (

          <div className="empty-state">

            <span>📅</span>

            <h3>
              No hay citas registradas
            </h3>

            <p>
              Las citas que registres aparecerán aquí.
            </p>

          </div>

        ) : (

          citas.map((cita) => (

            <div
              className="appointment-card"
              key={cita.id}
            >

              <h3>
                {cita.paciente}
              </h3>

              <p className="appointment-detail">
                <CalendarDays size={16} />
                {cita.fecha}
              </p>

              <p className="appointment-detail">
                <Clock size={16} />
                {cita.hora}
              </p>

              <p className="appointment-detail">
                <Stethoscope size={16} />
                {cita.tratamiento}
              </p>

              <p>
                {cita.estado === "pendiente" && "🟡 Pendiente"}

                {cita.estado === "atendida" && "🟢 Atendida"}

                {cita.estado === "cancelada" && "🔴 Cancelada"}
              </p>

              {cita.observaciones && (
                <p>
                  📝 {cita.observaciones}
                </p>
              )}

              <div className="appointment-actions">

                {cita.estado === "pendiente" && (
                  <>
                  <button
                    onClick={() =>
                      cambiarEstado(cita.id, "atendida")
                    }
                  >
                    <Check size={16} />
                    Atendida
                  </button>

                  <button
                    onClick={() =>
                      cambiarEstado(cita.id, "cancelada")
                    }
                  >
                    <X size={16} />
                    Cancelar
                  </button>
                  </>
                )}

                  <button
                    onClick={() => editarCita(cita)}
                    >
                    <Pencil size={16} />
                    Editar
                  </button>

                <button
                  onClick={() => eliminarCita(cita.id)}
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Citas;