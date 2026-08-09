import { useState } from "react";
import {
  User,
  Phone,
  IdCard,
  FileText,
  Calendar,
  Clock,
  Stethoscope,
  FileSpreadsheet,
} from "lucide-react";

function Historial({ pacientes, citas }) {
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState("");

  const pacienteActual = pacientes.find(
    (paciente) => paciente.nombre === pacienteSeleccionado
  );

  const citasPaciente = citas
    .filter((cita) => cita.paciente === pacienteSeleccionado)
    .sort(
      (a, b) =>
        new Date(`${b.fecha}T${b.hora}`) -
        new Date(`${a.fecha}T${a.hora}`)
    );

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Historial Clinico</h1>
          <p>
            Consulta el historial de tratamientos de cada paciente
          </p>
        </div>
      </div>

      <div className="form-container">
        <h2>Seleccionar paciente</h2>

        <select
          value={pacienteSeleccionado}
          onChange={(e) =>
            setPacienteSeleccionado(e.target.value)
          }
        >
          <option value="">Seleccionar paciente</option>

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

      {pacienteActual && (
        <div className="patient-info">
          <h2>
            <User size={22} className="inline-icon" /> {pacienteActual.nombre}
          </h2>

          <p className="patient-detail">
            <Phone size={16} /> {pacienteActual.telefono || "Sin teléfono"}
          </p>

          <p className="patient-detail">
            <IdCard size={16} /> DNI: {pacienteActual.dni || "No registrado"}
          </p>
        </div>
      )}

      {pacienteSeleccionado && (
        <div className="history-section">
          <div className="section-header">
            <h2>Historial de {pacienteSeleccionado}</h2>

            <span className="badge-count">
              {citasPaciente.length}{" "}
              {citasPaciente.length === 1 ? "registro" : "registros"}
            </span>
          </div>

          {citasPaciente.length === 0 ? (
            <div className="empty-state">
              <span>
                <FileSpreadsheet size={48} strokeWidth={1.5} />
              </span>

              <h3>No hay historial</h3>

              <p>
                Este paciente todavía no tiene tratamientos registrados.
              </p>
            </div>
          ) : (
            <div className="history-list">
              {citasPaciente.map((cita) => (
                <div className="history-card" key={cita.id}>
                  <div className="history-card-header">
                    <div>
                      <h3>
                        <Stethoscope size={18} className="inline-icon" />{" "}
                        {cita.tratamiento}
                      </h3>

                      <p className="appointment-detail">
                        <Calendar size={15} /> {cita.fecha}
                      </p>
                    </div>

                    <span className={`status ${cita.estado}`}>
                      <span className={`status-dot ${cita.estado}`} />
                      {cita.estado === "pendiente" && "Pendiente"}
                      {cita.estado === "atendida" && "Atendida"}
                      {cita.estado === "cancelada" && "Cancelada"}
                    </span>
                  </div>

                  <p className="appointment-detail">
                    <Clock size={15} /> Hora: {cita.hora}
                  </p>

                  {cita.observaciones && (
                    <p className="appointment-detail">
                      <FileText size={15} /> {cita.observaciones}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Historial;