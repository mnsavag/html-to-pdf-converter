export class AppError extends Error {
    constructor(name, status, description) {
      super(description);
  
      Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  
      this.name = name;
      this.status = status;
  
      Error.captureStackTrace(this);
    }
}