export const customErrorMiddleware = (err, req, res, next) => {
  // Log the error for debugging purposes
  console.error(err.stack);

  // Set a default error status code
  let statusCode = 500;

  // Check the type of error and set the appropriate status code
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
  }

  // Send an error response to the client
  res.status(statusCode).json({
    error: {
      message: err.message,
      path: req.path,
      statusCode: statusCode,
    },
  });
};