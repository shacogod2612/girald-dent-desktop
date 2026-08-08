function Header() {
    return (
    <header className="header">
          <div>
            <h1>Dashboard</h1>
            <p>Gestión de citas y pacientes</p>
          </div>

          <button className="new-appointment">
            + Nueva cita
          </button>
    </header>
    );
}

export default Header;