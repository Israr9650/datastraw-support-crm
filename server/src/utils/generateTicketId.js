const generateTicketId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `TKT-${timestamp}-${random}`;
};

module.exports = generateTicketId;