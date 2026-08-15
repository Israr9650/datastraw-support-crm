const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    ticketId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    customerName: {
      type: String,
      required: true,
      trim: true
    },
    customerEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    status: {
      type: String,
      enum: ["Open", "In Progress", "Closed"],
      default: "Open"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);