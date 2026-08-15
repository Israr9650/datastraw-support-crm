const express = require("express");

const {
  createTicket,
  getTickets,
  getTicket,
  updateTicket
} = require("../controllers/ticketController");

const router = express.Router();

router.post("/", createTicket);
router.get("/", getTickets);
router.get("/:ticket_id", getTicket);
router.put("/:ticket_id", updateTicket);

module.exports = router;