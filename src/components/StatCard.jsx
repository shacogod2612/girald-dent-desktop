function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="stat-card">

      <div className="stat-card-icon">
        <Icon size={24} />
      </div>

      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>

    </div>
  );
}

export default StatCard;

