export class AuthApiError extends Error {
  protected __isAuthError = true

  constructor(message: string) {
    super(message)
    this.name = 'AuthApiError'
  }
}

export function isAuthError(error: unknown): error is AuthError {
  return typeof error === 'object' && error !== null && '__isAuthError' in error
}

export class AuthError extends AuthApiError {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'AuthError'
    this.status = status
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
    }
  }
}

export class AuthUnknownError extends AuthApiError {
  originalError: unknown

  constructor(message: string, originalError: unknown) {
    super(message)
    this.name = 'AuthUnknownError'
    this.originalError = originalError
  }
}