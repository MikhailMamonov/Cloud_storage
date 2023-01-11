function errorHandler(err, req, res, next) {
  // Error handling middleware functionality
  console.log(`error ${err.message}`); // log the error
  const status = err.status || 400;
  // send back an easily understandable error message to the caller
  res.status(status).send({ message: err.message, stack: err.stack });
}

module.exports = errorHandler;
