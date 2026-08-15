import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const TicketCard = ({ ticket }) => {
  const statusClass = ticket.status.toLowerCase().replace(/\s+/g, "-");

  return (
    <Link to={`/tickets/${ticket.ticket_id}`} className="ticket-card">
      <div className="card-top">
        <span className="ticket-id">{ticket.ticket_id}</span>
        <span className={`status status-${statusClass}`}>{ticket.status}</span>
      </div>

      <h3 className="card-title">{ticket.subject}</h3>

      <p className="customer-name">{ticket.customer_name}</p>

      <div className="card-bottom">
        <span>{formatDate(ticket.created_at)}</span>
        <span className="view-link">View ticket →</span>
      </div>
    </Link>
  );
};

export default TicketCard;