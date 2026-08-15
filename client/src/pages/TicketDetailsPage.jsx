import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTicket, updateTicket } from "../services/ticketApi";
import { formatDateTime } from "../utils/formatDate";

const TicketDetailsPage = () => {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const fetchTicket = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getTicket(ticketId);

        if (!isCancelled) {
          setTicket(data);
          setStatus(data.status);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message || "Ticket not found");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchTicket();

    return () => {
      isCancelled = true;
    };
  }, [ticketId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccessMsg("");

      await updateTicket(ticketId, { status, notes });

      setNotes("");
      const updated = await getTicket(ticketId);
      setTicket(updated);
      setStatus(updated.status);
      setSuccessMsg("Ticket updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="container page">
        <p className="state-message">Loading ticket details...</p>
      </main>
    );
  }

  if (!ticket) {
    return (
      <main className="container page">
        <Link to="/" className="back-link">
          ← Back to tickets
        </Link>
        <div className="empty-state">
          <h3>Ticket not found</h3>
          <p>{error || "The requested ticket ID does not exist."}</p>
        </div>
      </main>
    );
  }

  const statusClass = ticket.status.toLowerCase().replace(/\s+/g, "-");

  return (
    <main className="container page">
      <Link to="/" className="back-link">
        ← Back to tickets
      </Link>

      <div className="detail-header">
        <div>
          <span className="ticket-id">{ticket.ticket_id}</span>
          <h1>{ticket.subject}</h1>
          <p className="detail-meta">
            Created on {formatDateTime(ticket.created_at)}
          </p>
        </div>
        <span className={`status status-${statusClass}`}>{ticket.status}</span>
      </div>

      {successMsg && <div className="alert alert-success">{successMsg}</div>}
      {error && <div className="alert alert-error">{error}</div>}

      <div className="detail-layout">
        <section className="detail-card">
          <h2>CUSTOMER</h2>
          <div className="customer-info">
            <div>
              <span>Name</span>
              <strong>{ticket.customer_name}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{ticket.customer_email}</strong>
            </div>
          </div>
        </section>

        <section className="detail-card">
          <h2>ISSUE</h2>
          <p className="description">{ticket.description}</p>
        </section>

        <section className="detail-card">
          <h2>UPDATE TICKET</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="form-group">
              <label>Add internal note</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Add a note for the support team..."
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </button>
          </form>
        </section>

        <section className="detail-card">
          <h2>NOTES</h2>
          {ticket.notes && ticket.notes.length > 0 ? (
            <div className="notes-list">
              {ticket.notes.map((note, index) => (
                <div className="note-item" key={index}>
                  <p className="note-text">{note.note_text}</p>
                  <span className="note-date">
                    {formatDateTime(note.created_at)}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="muted">No internal notes added yet.</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default TicketDetailsPage;