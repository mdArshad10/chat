const errorMiddleware = async (error, req, res, next) => {
  const message = error.message ? error.message : "Internal Server Error";
  const statusCode = error.statusCode ? error.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message,
    stack: error.stack,
  });
};


export {errorMiddleware}