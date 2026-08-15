const API_URL = import.meta.env.VITE_API_URL;

const request = async (url, options = {}) => {
  const response = await fetch(`${API_URL}${url}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const getTickets = async ({ search = "", status = "" } = {}, options = {}) => {
  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  if (status) {
    params.set("status", status);
  }

  const query = params.toString();

  return request(`/tickets${query ? `?${query}` : ""}`, options);
};

export const createTicket = async (ticket) => {
  return request("/tickets", {
    method: "POST",
    body: JSON.stringify(ticket)
  });
};

export const getTicket = async (ticketId) => {
  return request(`/tickets/${ticketId}`);
};

export const updateTicket = async (ticketId, data) => {
  return request(`/tickets/${ticketId}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
};