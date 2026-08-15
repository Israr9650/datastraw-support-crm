import { useState } from "react";

const TicketForm = ({ onSubmit, loading }) => {
  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    subject: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Customer Name</label>
        <input
          type="text"
          name="customer_name"
          value={form.customer_name}
          onChange={handleChange}
          placeholder="e.g. John Doe"
          required
        />
      </div>

      <div className="form-group">
        <label>Customer Email</label>
        <input
          type="email"
          name="customer_email"
          value={form.customer_email}
          onChange={handleChange}
          placeholder="e.g. john@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label>Issue Title</label>
        <input
          type="text"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          placeholder="Brief summary of the issue"
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe the issue in detail..."
          rows={5}
          required
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Creating..." : "Submit Ticket"}
      </button>
    </form>
  );
};

export default TicketForm;