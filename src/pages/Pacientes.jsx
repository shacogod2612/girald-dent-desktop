import { useState } from "react";

function Pacientes({ pacientes, setPacientes }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const [pacienteEditando, setPacienteEditando] = useState(null);

  const [nuevoPaciente, setNuevoPaciente] = useState({
    nombre: "",
    telefono: "",
    dni: "",
  });

  function manejarCambio(e) {
    const { name, value } = e.target;

    setNuevoPaciente({
      ...nuevoPaciente,
      [name]: value,
    });
  }

  function registrarPaciente(e) {
    e.preventDefault();

    const paciente = {
      id: Date.now(),
      nombre: nuevoPaciente.nombre,
      telefono: nuevoPaciente.telefono,
      dni: nuevoPaciente.dni,
    };

    setPacientes([
      ...pacientes,
      paciente,
    ]);

    limpiarFormulario();
  }

  function editarPaciente(paciente) {
    setPacienteEditando(paciente);

    setNuevoPaciente({
      nombre: paciente.nombre,
      telefono: paciente.telefono,
      dni: paciente.dni,
    });

    setMostrarFormulario(true);
  }

  function actualizarPaciente(e) {
    e.preventDefault();

    const pacientesActualizados = pacientes.map((paciente) => {
      if (paciente.id === pacienteEditando.id) {
        return {
          ...paciente,
          nombre: nuevoPaciente.nombre,
          telefono: nuevoPaciente.telefono,
          dni: nuevoPaciente.dni,
        };
      }

      return paciente;
    });

    setPacientes(pacientesActualizados);

    limpiarFormulario();
  }

  function eliminarPaciente(id) {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este paciente?"
    );

    if (!confirmar) {
      return;
    }

    const pacientesActualizados = pacientes.filter(
      (paciente) => paciente.id !== id
    );

    setPacientes(pacientesActualizados);
  }

  function limpiarFormulario() {
    setNuevoPaciente({
      nombre: "",
      telefono: "",
      dni: "",
    });

    setPacienteEditando(null);
    setMostrarFormulario(false);
  }

  return (
    <div className="page">

      <div className="page-header">

        <div>
          <h1>Pacientes</h1>

          <p>
            Registro de pacientes de Girald-Dent
          </p>
        </div>

        <button
          className="new-appointment"
          onClick={() => {
            setPacienteEditando(null);
            setNuevoPaciente({
              nombre: "",
              telefono: "",
              dni: "",
            });
            setMostrarFormulario(true);
          }}
        >
          + Nuevo paciente
        </button>

      </div>

      {mostrarFormulario && (
        <div className="form-container">

          <h2>
            {pacienteEditando
              ? "Editar paciente"
              : "Registrar paciente"}
          </h2>

          <form
            onSubmit={
              pacienteEditando
                ? actualizarPaciente
                : registrarPaciente
            }
          >

            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo"
              value={nuevoPaciente.nombre}
              onChange={manejarCambio}
              required
            />

            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={nuevoPaciente.telefono}
              onChange={manejarCambio}
            />

            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={nuevoPaciente.dni}
              onChange={manejarCambio}
            />

            <div>

              <button type="submit">
                {pacienteEditando
                  ? "Guardar cambios"
                  : "Guardar paciente"}
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

      <div className="patients-list">

        {pacientes.length === 0 ? (

          <div className="empty-state">

            <span>👥</span>

            <h3>
              No hay pacientes registrados
            </h3>

            <p>
              Los pacientes que registres aparecerán aquí.
            </p>

          </div>

        ) : (

          pacientes.map((paciente) => (

            <div
              className="patient-card"
              key={paciente.id}
            >

              <h3>
                {paciente.nombre}
              </h3>

              <p>
                📱 {paciente.telefono || "Sin teléfono"}
              </p>

              <p>
                🪪 DNI: {paciente.dni || "No registrado"}
              </p>

              <div className="patient-actions">

                <button
                  onClick={() => editarPaciente(paciente)}
                >
                  ✏️ Editar
                </button>

                <button
                  onClick={() => eliminarPaciente(paciente.id)}
                >
                  🗑️ Eliminar
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Pacientes;