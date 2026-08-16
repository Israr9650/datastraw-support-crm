# Support CRM - Customer Support Ticketing System

A full-stack web application designed for customer support teams to create, track, manage, and update support tickets. Built using React, Node.js, Express, and MongoDB.

---

## 📌 Project Overview

Support CRM is an internal customer support ticketing tool created to help support teams manage incoming customer requests from one central place. In many small support operations, customer issues arrive through multiple channels without a structured way to track their progress, leading to delayed responses or lost requests.

This application provides a simple workflow: support agents or users can log a new support ticket with customer details and an issue description. The system automatically assigns a unique ticket ID and timestamp. Agents can then view all tickets on a central dashboard, monitor summary metrics (Total, Open, In Progress, Closed), search across ticket details, filter by status, view complete ticket details, and update the status while adding internal notes.

The project was designed with a focus on simplicity, usability, and clean code structure suitable for a 0–1 year full-stack developer portfolio project.

---

## 🖼️  Demo

*Live Demo:* https://datastraw-support-crm-2f44.vercel.app/


---

## ✨ Key Features

- **Create Support Tickets**: Form to log tickets with customer name, email, issue title, and detailed description. Automatically assigns a unique ticket ID (`TKT-XXXXXX-XXXX`) and timestamp.
- **Ticket Dashboard**: Overview displaying summary counts for Total, Open, In Progress, and Closed tickets calculated dynamically from loaded data.
- **Real-Time Search**: Search input that filters tickets by customer name, ticket ID, email, subject, or description while typing.
- **Status Filter**: Filter ticket list by status (All Statuses, Open, In Progress, Closed).
- **Ticket Details View**: Dedicated view displaying customer details, full issue description, and current ticket status.
- **Status Updates**: Select dropdown to change ticket status between Open, In Progress, and Closed.
- **Internal Notes**: Append internal team comments to any ticket with recorded timestamps.
- **Responsive Layout**: Clean, plain CSS layout tailored for desktop, tablet, and mobile browsers.

---

## 🛠️ Tech Stack

### Frontend
- **React (v19)**: User interface library for component-based rendering.
- **Vite (v8)**: Fast build tool and local development server.
- **React Router (v7)**: Client-side routing (`/`, `/tickets/new`, `/tickets/:ticketId`).
- **Plain CSS**: Custom CSS stylesheet (`index.css`) for layout, component styling, and responsive design.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js (v5)**: Web application framework for routing and REST API endpoints.
- **CORS**: Middleware to handle Cross-Origin Resource Sharing between frontend and backend.
- **Dotenv**: Environment variable loader for backend configuration.

### Database
- **MongoDB**: NoSQL database for document storage.
- **Mongoose (v9)**: Object Data Modeling (ODM) library for database schema definition and validation.

---

## 🏗️ Application Architecture

```text
  ┌─────────────────┐
  │   User Browser  │
  └────────┬────────┘
           │ (HTTP Requests)
           ▼
  ┌─────────────────┐
  │  React Frontend │ (Vite + React Router)
  └────────┬────────┘
           │ (JSON / REST API)
           ▼
  ┌─────────────────┐
  │ Express Backend │ (Node.js REST API Server)
  └────────┬────────┘
           │ (Mongoose ODM)
           ▼
  ┌─────────────────┐
  │ MongoDB Database│ (Tickets & Notes Collections)
  └─────────────────┘
```

### Layer Responsibilities
- **Frontend (Client)**: Manages UI components, state (`useState`, `useEffect`), client routing, user inputs, debounced API calls, and displaying loading/error states.
- **REST API Contract**: Communication interface exchanging JSON data via standard HTTP methods (`POST`, `GET`, `PUT`).
- **Backend (Server)**: Handles API routing, input validation, string trimming, regex escaping for search queries, and error handling middleware.
- **Database (MongoDB)**: Stores `tickets` and `notes` collections persistently with Mongoose schemas and unique indexes.

---

## 📁 Project Structure

```text
support-crm/
├── client/                     # Frontend Application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Header.jsx      # Top navigation navbar
│   │   │   ├── SearchBar.jsx   # Search input component
│   │   │   ├── StatusFilter.jsx# Status dropdown filter
│   │   │   ├── TicketCard.jsx  # Individual ticket list item
│   │   │   └── TicketForm.jsx  # Controlled form component
│   │   ├── pages/              # Route pages
│   │   │   ├── TicketsPage.jsx # Home dashboard & list
│   │   │   ├── NewTicketPage.jsx # Create ticket page
│   │   │   └── TicketDetailsPage.jsx # Detail & update page
│   │   ├── services/
│   │   │   └── ticketApi.js    # Fetch API wrapper functions
│   │   ├── utils/
│   │   │   └── formatDate.js   # Date formatting helpers
│   │   ├── App.jsx             # Router layout setup
│   │   ├── main.jsx            # Application entry point
│   │   └── index.css           # Global CSS styles
│   ├── .env.example            # Frontend env template
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API Server
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Mongoose MongoDB connection
│   │   ├── controllers/
│   │   │   └── ticketController.js # Route handler functions
│   │   ├── middleware/
│   │   │   └── errorHandler.js # Central error middleware
│   │   ├── models/
│   │   │   ├── Ticket.js       # Ticket Mongoose schema
│   │   │   └── Note.js         # Note Mongoose schema
│   │   ├── routes/
│   │   │   └── ticketRoutes.js # Express router endpoints
│   │   ├── utils/
│   │   │   └── generateTicketId.js # Ticket ID generator
│   │   ├── app.js              # Express app setup & middleware
│   │   └── server.js           # Server entry point
│   ├── .env.example            # Backend env template
│   └── package.json
│
├── .gitignore                  # Git ignore rules for root, client & server
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Purpose | Request Data / Query | Response |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/tickets` | Create a new ticket | Body: `{ customer_name, customer_email, subject, description }` | `{ ticket_id, created_at }` |
| `GET` | `/api/tickets` | List tickets (search & filter) | Query: `?status=Open&search=query` | Array of `[{ ticket_id, customer_name, subject, status, created_at }]` |
| `GET` | `/api/tickets/:ticket_id` | Fetch single ticket details | URL param: `:ticket_id` | Object containing ticket details & `notes` array |
| `PUT` | `/api/tickets/:ticket_id` | Update status / add internal note | Body: `{ status, notes }` | `{ success: true, updated_at }` |

---

## 🗄️ Database Schemas

The database uses two Mongoose models:

### 1. Ticket Model (`models/Ticket.js`)
- `ticketId` (String, required, unique, indexed): Custom ID (e.g. `TKT-123456-7890`).
- `customerName` (String, required, trimmed): Name of the customer.
- `customerEmail` (String, required, trimmed, lowercase): Customer email address.
- `subject` (String, required, trimmed): Title / summary of the issue.
- `description` (String, required, trimmed): Detailed description of the problem.
- `status` (String, enum: `["Open", "In Progress", "Closed"]`, default: `"Open"`).
- `timestamps`: Automatically manages `createdAt` and `updatedAt`.

### 2. Note Model (`models/Note.js`)
- `ticketId` (String, required, indexed): Reference matching the parent ticket's `ticketId`.
- `noteText` (String, required, trimmed): Content of the internal note.
- `createdAt` (Timestamp): Date and time the note was created.

---

## 🔐 Environment Variables

### Backend Environment Variables (`server/.env`)
Create a `.env` file inside the `server/` directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/support_crm?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

### Frontend Environment Variables (`client/.env`)
Create a `.env` file inside the `client/` directory:
```env
VITE_API_URL=https://datastraw-support-crm-2f44.vercel.app/api
```

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)
- MongoDB instance (local or MongoDB Atlas cluster)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Israr9650/datastraw-support-crm.git
cd datastraw-support-crm
```

### Step 2: Configure & Start Backend
```bash
cd server
npm install
```
Create `server/.env` based on `server/.env.example` and set your `MONGO_URI`.
```bash
npm run dev
```
The backend server will start at `http://localhost:5000`.

### Step 3: Configure & Start Frontend
In a new terminal window:
```bash
cd client
npm install
```
Create `client/.env` based on `client/.env.example`.
```bash
npm run dev
```
The frontend application will start at `http://localhost:5173`.

---

## 🔄 How It Works

1. **Ticket Creation**: When a user submits the form on `/tickets/new`, the frontend sends a `POST /api/tickets` request. The backend validates required fields, checks email syntax, generates a unique ticket ID, and saves the document in MongoDB. The user is then redirected to the ticket details page (`/tickets/:ticketId`).
2. **Dashboard Fetching & Debouncing**: On `/`, the dashboard fetches tickets from `GET /api/tickets`. When typing in the search bar or changing status filters, a 250ms debounce with an `AbortController` handles fetch requests cleanly without race conditions.
3. **Stat Calculation**: Summary counts (Total, Open, In Progress, Closed) are computed on the client side directly from loaded ticket state without requiring extra backend queries.
4. **Ticket Updates & Notes**: On `/tickets/:ticketId`, users can change the status dropdown or enter an internal note. Submitting sends a `PUT /api/tickets/:ticket_id` request, saving the updated status and creating a new record in the `notes` collection. An inline success message confirms the update.

---

## 🚀 Deployment

The project is structured for deployment on platforms such as Vercel, Render, or Railway:

- **Frontend**: Can be built using `npm run build` inside `client/` and deployed to Vercel or Netlify.
- **Backend**: Can be deployed to Render or Railway using `npm run start` (`node src/server.js`) inside `server/`.

*Live Application Link:* https://datastraw-support-crm-2f44.vercel.app/

---

## 🧠 Challenges & Learning Points

Building this full-stack assignment provided practical hands-on experience with:

- **Connecting React & Express**: Setting up client-side API services (`fetch`) and configuring CORS middleware on the server.
- **Handling Search Debouncing**: Implementing `AbortController` alongside `setTimeout` cleanup to cancel pending HTTP requests when users type rapidly into the search input.
- **Mongoose Data Modeling**: Designing schemas with field validations, trimmed strings, timestamps, and indexing query fields (`ticketId`).
- **Input Sanitization**: Escaping regex special characters in backend search controllers to prevent regular expression server crashes.
- **React State & Effects**: Managing state cleanly across multiple views without over-complicating state management.

---

## 🔮 Future Improvements

If given more time, potential additions to expand this project could include:

- **Authentication & Authorization**: Adding user login with JWT tokens for support agents.
- **Pagination**: Adding page numbers or cursor pagination to `GET /api/tickets` for handling thousands of tickets efficiently.
- **Email Notifications**: Triggering automated confirmation emails to customers when tickets are created or closed.
- **Role-Based Access**: Distinguishing between customer submitters and support admin roles.

---

## 📜 Assignment Context

This application was developed as a Support CRM technical hiring assignment for Datastraw Technologies to evaluate full-stack web development skills including database design, REST API implementation, and React frontend development.

---

## 👤 Author

**Israr Ahmad Khan**
- GitHub: [https://github.com/Israr9650](https://github.com/Israr9650)
- Repository: [https://github.com/Israr9650/datastraw-support-crm](https://github.com/Israr9650/datastraw-support-crm)
