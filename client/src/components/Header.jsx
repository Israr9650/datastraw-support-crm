import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          Support CRM
        </Link>
        <Link to="/tickets/new" className="btn btn-primary">
          New Ticket
        </Link>
      </div>
    </header>
  );
};

export default Header;