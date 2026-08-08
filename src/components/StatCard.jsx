function StatCard({ icon, title, value }) {
  return (
    <div className="stat-card">
      <span>{icon}</span>

      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default StatCard;