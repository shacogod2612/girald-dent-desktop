import { useState } from "react";

function Historial({ pacientes, citas }) {
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState("");

  const citasPaciente = citas.filter(
    (cita) => cita.paciente === pacienteSeleccionado
  );

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>Historial</h1>
          <p>Consulta el historial de tratamientos de cada paciente</p>
        </div>

      </div>

      <div className="form-container">

        <h2>Seleccionar paciente</h2>

        <select
          value={pacienteSeleccionado}
          onChange={(e) => setPacienteSeleccionado(e.target.value)}
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

      </div>

      {pacienteSeleccionado && (
        <div className="appointments-page">

          <h2>
            Historial de {pacienteSeleccionado}
          </h2>

          {citasPaciente.length === 0 ? (

            <div className="empty-state">

              <span>📋</span>

              <h3>
                No hay historial
              </h3>

              <p>
                Este paciente todavía no tiene tratamientos registrados.
              </p>

            </div>

          ) : (

            citasPaciente.map((cita) => (

              <div
                className="appointment-card"
                key={cita.id}
              >

                <h3>
                  🦷 {cita.tratamiento}
                </h3>

                <p>
                  📅 {cita.fecha}
                </p>

                <p>
                  🕐 {cita.hora}
                </p>

                {cita.observaciones && (
                  <p>
                    📝 {cita.observaciones}
                  </p>
                )}

              </div>

            ))

          )}

        </div>
      )}

    </div>
  );
}

export default Historial;