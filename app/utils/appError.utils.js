export class HttpError extends Error {
    constructor(name, status, description) {
      super(description)
  
      Object.setPrototypeOf(this, new.target.prototype)
  
      this.name = name
      this.status = status
  
      Error.captureStackTrace(this)
    }
}