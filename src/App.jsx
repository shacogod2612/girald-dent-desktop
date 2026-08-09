import { useState } from "react";
import "./App.css";
import {
  CalendarDays,
  Users,
  CheckCircle,
  Clock,
  Stethoscope,
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import Citas from "./pages/Citas";
import Pacientes from "./pages/Pacientes";
import Historial from "./pages/Historial";

function App() {
  const [pagina, setPagina] = useState("dashboard");
  const [pacientes, setPacientes] = useState([]);
  const [citas, setCitas] = useState([]);

  const hoy = new Date().toISOString().split("T")[0];

  const citasHoy = citas.filter(
    (cita) => cita.fecha === hoy
  );

  const atendidosHoy = citas.filter(
    (cita) =>
      cita.fecha === hoy &&
      cita.estado === "atendida"
  );

  return (
    <div className="app">
      <Sidebar
        cambiarPagina={setPagina}
        pagina={pagina}
      />

      <main className="main">
        {pagina === "dashboard" && (
          <>
            {/* Le pasamos setPagina a Header para que redirija al hacer clic en '+ Nueva cita' */}
            <Header setPagina={setPagina} />

            <section className="stats">
              <StatCard
                icon={CalendarDays}
                title="Citas de hoy"
                value={citasHoy.length}
              />

              <StatCard
                icon={Users}
                title="Pacientes"
                value={pacientes.length}
              />

              <StatCard
                icon={CheckCircle}
                title="Atendidos hoy"
                value={atendidosHoy.length}
              />
            </section>

            <section className="appointments">
              <div className="section-header">
                <h2>Citas de hoy</h2>

                {/* Conectamos el botón 'Ver todas' para ir a la pestaña de citas */}
                <button onClick={() => setPagina("citas")}>
                  Ver todas
                </button>
              </div>

              {citasHoy.length === 0 ? (
                <div className="empty-state">
                  <CalendarDays size={42} />

                  <h3>
                    No hay citas para hoy
                  </h3>

                  <p>
                    Las citas registradas aparecerán aquí.
                  </p>
                </div>
              ) : (
                <div className="today-appointments">
                  {citasHoy.map((cita) => (
                    <div
                      className="appointment-card"
                      key={cita.id}
                    >
                      <h3>
                        {cita.paciente}
                      </h3>

                      <p className="appointment-detail">
                        <Clock size={16} />
                        {cita.hora}
                      </p>

                      <p className="appointment-detail">
                        <Stethoscope size={16} />
                        {cita.tratamiento}
                      </p>

                      <p className="appointment-status">
                        {cita.estado === "pendiente" ? (
                          <>
                            <span className="status-dot pendiente"></span>
                            Pendiente
                          </>
                        ) : (
                          <>
                            <span className="status-dot atendida"></span>
                            Atendida
                          </>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {pagina === "citas" && (
          <Citas
            pacientes={pacientes}
            citas={citas}
            setCitas={setCitas}
          />
        )}

        {pagina === "pacientes" && (
          <Pacientes
            pacientes={pacientes}
            setPacientes={setPacientes}
          />
        )}

        {pagina === "historial" && (
          <Historial
            pacientes={pacientes}
            citas={citas}
          />
        )}
      </main>
    </div>
  );
}

export default App;