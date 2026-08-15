const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by ID, customer, subject..."
      className="search-input"
    />
  );
};

export default SearchBar;