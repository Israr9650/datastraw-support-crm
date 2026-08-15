# Support CRM - Customer Support Ticketing System

A full-stack web-based Customer Support CRM built for managing support tickets, customer details, issue tracking, and internal team notes.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, Plain CSS, React Router v7
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose ODM
- **API Architecture**: RESTful API

---

## ✨ Features

1. **Create Support Tickets**
   - Submit tickets with customer name, email, issue title, and detailed description.
   - Auto-generated collision-free ticket ID (`TKT-XXXXXX-XXXX`) and timestamp.

2. **Ticket Dashboard & Real-Time Stats**
   - Compact summary row showing counts for **Total**, **Open**, **In Progress**, and **Closed** tickets.
   - Scannable list showing Ticket ID, Customer Name, Title, Status badge, and Date.

3. **Search & Status Filtering**
   - Debounced search across customer names, ticket IDs, emails, subjects, and descriptions.
   - Filter tickets by status (**All**, **Open**, **In Progress**, **Closed**).
   - Result count indicator and clean empty state displays.

4. **Ticket Details & Internal Notes**
   - Detailed view displaying customer information and full issue context.
   - Update ticket status (**Open**, **In Progress**, **Closed**).
   - Add internal notes/comments with timestamps.
   - Inline success notifications on updates.

5. **Responsive & Accessible Design**
   - Clean, modern, calm UI tailored for support team workflows.
   - Mobile-responsive layout for desktop, tablet, and mobile browsers.

---

## 📁 Project Structure

```text
support-crm/
├── client/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/     # Header, SearchBar, StatusFilter, TicketCard, TicketForm
│   │   ├── pages/          # TicketsPage, NewTicketPage, TicketDetailsPage
│   │   ├── services/       # API fetch service (ticketApi.js)
│   │   ├── utils/          # Date formatting utilities (formatDate.js)
│   │   ├── App.jsx         # React Router setup
│   │   ├── main.jsx        # App entry point
│   │   └── index.css       # Clean plain CSS stylesheet
│   ├── .env.example
│   └── package.json
│
├── server/                 # Node.js + Express Backend
│   ├── src/
│   │   ├── config/         # MongoDB connection (db.js)
│   │   ├── controllers/    # Ticket request handlers (ticketController.js)
│   │   ├── middleware/     # Centralized error handler
│   │   ├── models/         # Ticket and Note Mongoose schemas
│   │   ├── routes/         # Express routes (ticketRoutes.js)
│   │   ├── utils/          # Ticket ID generator
│   │   ├── app.js          # Express app configuration
│   │   └── server.js       # Server startup entry
│   ├── .env.example
│   └── package.json
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Request Body / Query |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/tickets` | Create a new ticket | `{ customer_name, customer_email, subject, description }` |
| `GET` | `/api/tickets` | List tickets (with search & filter) | `?status=Open&search=query` |
| `GET` | `/api/tickets/:ticket_id` | Get single ticket & internal notes | None |
| `PUT` | `/api/tickets/:ticket_id` | Update ticket status and/or add note | `{ status, notes }` |

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/support_crm?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🛠️ Local Development Setup

### 1. Backend Setup
```bash
cd server
npm install
npm run dev
```
Backend server will run at `http://localhost:5000`.

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Frontend app will run at `http://localhost:5173`.
