import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import { createTicket } from "../services/ticketApi";

const NewTicketPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      setError("");

      const ticket = await createTicket(formData);
      navigate(`/tickets/${ticket.ticket_id}`);
    } catch (err) {
      setError(err.message || "Failed to create ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container page narrow-page">
      <Link to="/" className="back-link">
        ← Back to tickets
      </Link>

      <div className="page-heading">
        <p className="eyebrow">Customer Support</p>
        <h1>Create a ticket</h1>
        <p className="page-description">
          Add the customer and issue details to start a support request.
        </p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <TicketForm onSubmit={handleSubmit} loading={loading} />
    </main>
  );
};

export default NewTicketPage;