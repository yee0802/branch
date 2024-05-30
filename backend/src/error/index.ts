class CustomError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);

    if (status !== undefined) {
      this.status = status;
    }

    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default function throwNewError(message: string, status?: number) {
  throw new CustomError(message, status);
}
