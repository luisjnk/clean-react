export class RequiredFieldError extends Error {
  constructor() {
    super("Field required")
    this.name = "RequiredFieldError"
  }
}
