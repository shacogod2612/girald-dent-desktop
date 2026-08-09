function Header({ setPagina }) {
  return (
    <header className="header">
      <div>
        <h1>Dashboard</h1>
        <p>Gestión de citas y pacientes</p>
      </div>

      <button 
        className="new-appointment" 
        onClick={() => setPagina("pacientes")}
      >
        + Nueva cita
      </button>
    </header>
  );
}

export default Header;