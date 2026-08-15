import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import StatusFilter from "../components/StatusFilter";
import TicketCard from "../components/TicketCard";
import { getTickets } from "../services/ticketApi";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [allTickets, setAllTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchTickets = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getTickets({ search, status }, { signal: controller.signal });
        setTickets(data);

        if (!search && !status) {
          setAllTickets(data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to fetch tickets");
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchTickets, 250);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [search, status]);

  const sourceList = allTickets.length > 0 ? allTickets : tickets;
  const totalCount = sourceList.length;
  const openCount = sourceList.filter((t) => t.status === "Open").length;
  const inProgressCount = sourceList.filter((t) => t.status === "In Progress").length;
  const closedCount = sourceList.filter((t) => t.status === "Closed").length;

  return (
    <main className="container page">
      <div className="page-heading">
        <p className="eyebrow">Customer Support</p>
        <h1>Tickets</h1>
        <p className="page-description">
          Track, search and manage customer issues.
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total</span>
          <span className="stat-value">{totalCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Open</span>
          <span className="stat-value open-value">{openCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">In Progress</span>
          <span className="stat-value progress-value">{inProgressCount}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Closed</span>
          <span className="stat-value closed-value">{closedCount}</span>
        </div>
      </div>

      <div className="toolbar">
        <SearchBar value={search} onChange={setSearch} />
        <StatusFilter value={status} onChange={setStatus} />
      </div>

      <div className="result-bar">
        <span>{loading ? "Loading..." : `${tickets.length} ${tickets.length === 1 ? "ticket" : "tickets"}`}</span>
      </div>

      {loading && <p className="state-message">Loading tickets...</p>}

      {!loading && error && <div className="alert alert-error">{error}</div>}

      {!loading && !error && tickets.length === 0 && (
        <div className="empty-state">
          <h3>No tickets found</h3>
          <p>Try a different search or status filter.</p>
        </div>
      )}

      {!loading && !error && tickets.length > 0 && (
        <div className="ticket-list">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.ticket_id} ticket={ticket} />
          ))}
        </div>
      )}
    </main>
  );
};

export default TicketsPage;