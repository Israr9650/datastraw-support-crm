const Ticket = require("../models/Ticket");
const Note = require("../models/Note");
const generateTicketId = require("../utils/generateTicketId");

const createTicket = async (req, res, next) => {
  try {
    const customer_name = req.body.customer_name?.trim();
    const customer_email = req.body.customer_email?.trim();
    const subject = req.body.subject?.trim();
    const description = req.body.description?.trim();

    if (!customer_name || !customer_email || !subject || !description) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer_email)) {
      return res.status(400).json({
        message: "Please enter a valid email address"
      });
    }

    const ticket = await Ticket.create({
      ticketId: generateTicketId(),
      customerName: customer_name,
      customerEmail: customer_email,
      subject,
      description
    });

    res.status(201).json({
      ticket_id: ticket.ticketId,
      created_at: ticket.createdAt
    });
  } catch (error) {
    next(error);
  }
};

const getTickets = async (req, res, next) => {
  try {
    const { status, search } = req.query;

    const filter = {};

    if (status && ["Open", "In Progress", "Closed"].includes(status)) {
      filter.status = status;
    }

    if (search?.trim()) {
      const searchValue = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      filter.$or = [
        { ticketId: { $regex: searchValue, $options: "i" } },
        { customerName: { $regex: searchValue, $options: "i" } },
        { customerEmail: { $regex: searchValue, $options: "i" } },
        { subject: { $regex: searchValue, $options: "i" } },
        { description: { $regex: searchValue, $options: "i" } }
      ];
    }

    const tickets = await Ticket.find(filter).sort({ createdAt: -1 });

    res.json(
      tickets.map((ticket) => ({
        ticket_id: ticket.ticketId,
        customer_name: ticket.customerName,
        subject: ticket.subject,
        status: ticket.status,
        created_at: ticket.createdAt
      }))
    );
  } catch (error) {
    next(error);
  }
};

const getTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findOne({
      ticketId: req.params.ticket_id
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    const notes = await Note.find({
      ticketId: ticket.ticketId
    }).sort({ createdAt: -1 });

    res.json({
      ticket_id: ticket.ticketId,
      customer_name: ticket.customerName,
      customer_email: ticket.customerEmail,
      subject: ticket.subject,
      description: ticket.description,
      status: ticket.status,
      created_at: ticket.createdAt,
      notes: notes.map((note) => ({
        note_text: note.noteText,
        created_at: note.createdAt
      }))
    });
  } catch (error) {
    next(error);
  }
};

const updateTicket = async (req, res, next) => {
  try {
    const { status, notes } = req.body;

    if (
      status &&
      !["Open", "In Progress", "Closed"].includes(status)
    ) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const ticket = await Ticket.findOne({
      ticketId: req.params.ticket_id
    });

    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found"
      });
    }

    if (status) {
      ticket.status = status;
      await ticket.save();
    }

    if (notes?.trim()) {
      await Note.create({
        ticketId: ticket.ticketId,
        noteText: notes.trim()
      });
    }

    const updatedTicket = await Ticket.findOne({
      ticketId: ticket.ticketId
    });

    res.json({
      success: true,
      updated_at: updatedTicket.updatedAt
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  updateTicket
};