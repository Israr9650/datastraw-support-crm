const errorHandler = (error, req, res, next) => {
  console.error(error);

  res.status(error.status || 500).json({
    message: error.message || "Something went wrong"
  });
};

module.exports = errorHandler;