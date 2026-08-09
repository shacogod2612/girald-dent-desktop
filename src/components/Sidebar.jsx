import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardList,
} from "lucide-react";

function Sidebar({ cambiarPagina, pagina }) {
  return (
    <aside className="sidebar">

      <div className="logo">
        <span className="logo-icon">
          <ClipboardList size={28} />
        </span>

        <span>Girald-Dent</span>
      </div>

      <nav className="menu">

        <button
          className={pagina === "dashboard" ? "active" : ""}
          onClick={() => cambiarPagina("dashboard")}
        >
          <LayoutDashboard size={20} />

          <span>Dashboard</span>
        </button>

        <button
          className={pagina === "citas" ? "active" : ""}
          onClick={() => cambiarPagina("citas")}
        >
          <CalendarDays size={20} />

          <span>Citas</span>
        </button>

        <button
          className={pagina === "pacientes" ? "active" : ""}
          onClick={() => cambiarPagina("pacientes")}
        >
          <Users size={20} />

          <span>Pacientes</span>
        </button>

        <button
          className={pagina === "historial" ? "active" : ""}
          onClick={() => cambiarPagina("historial")}
        >
          <ClipboardList size={20} />

          <span>Historial</span>
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;

