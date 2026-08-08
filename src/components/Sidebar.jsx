function Sidebar({ cambiarPagina }) {
  return (
    <aside className="sidebar">

      <div className="logo">
        🦷
        <span>Girald-Dent</span>
      </div>

      <nav className="menu">

        <button onClick={() => cambiarPagina("dashboard")}>
          📊 Dashboard
        </button>

        <button onClick={() => cambiarPagina("citas")}>
          📅 Citas
        </button>

        <button onClick={() => cambiarPagina("pacientes")}>
          👥 Pacientes
        </button>
        
        <button onClick={() => cambiarPagina("historial")}>
          📋 Historial
        </button>

      </nav>

    </aside>
  );
}

export default Sidebar;