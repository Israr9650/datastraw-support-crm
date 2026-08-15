const StatusFilter = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="filter-select"
    >
      <option value="">All Statuses</option>
      <option value="Open">Open</option>
      <option value="In Progress">In Progress</option>
      <option value="Closed">Closed</option>
    </select>
  );
};

export default StatusFilter;