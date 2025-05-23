//@des create error handler

class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.status = `${statusCode}`.startsWith(4) ? 'fail' : "error";
  }
}
export default ApiError; 