export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public errortype: string
  ) {
    super(message);
    this.errortype = errortype;
    this.statusCode = statusCode;
  }
}
