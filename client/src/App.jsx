import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import TicketsPage from "./pages/TicketsPage";
import NewTicketPage from "./pages/NewTicketPage";
import TicketDetailsPage from "./pages/TicketDetailsPage";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<TicketsPage />} />
        <Route
          path="/tickets/new"
          element={<NewTicketPage />}
        />
        <Route
          path="/tickets/:ticketId"
          element={<TicketDetailsPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;