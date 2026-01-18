export class AppError extends Error {
  statusCode: number;
  email?: string;

  constructor(message: string, statusCode = 500, email?: string) {
    super(message); // Sends the message to the parent Error class
    this.statusCode = statusCode;
    this.email = email;

    // restore proper prototype chain
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
