export interface IResponse<T> {
  httpStatusCode?: number;
  content?: T;
  error?: {
    message?: string | object;
    errorReference?: string;
    idErrorReference?: string;
  };
}
export class HttpResponse<T> {
  readonly httpStatusCode: number;
  readonly content: T;
  readonly error: {
    readonly message?: string | object;
    readonly errorReference?: string;
    readonly idErrorReference?: string;
  };

  constructor(input: IResponse<T>) {
    this.httpStatusCode = input.httpStatusCode;
    this.content = input.content;
    this.error = input.error;

    Object.freeze(this);
  }

  static OK<T>(data: T): HttpResponse<T> {
    return new HttpResponse<T>({
      content: data,
      httpStatusCode: 200,
    });
  }
  static CREATED<T>(data: T): HttpResponse<T> {
    return new HttpResponse<T>({
      content: data,
      httpStatusCode: 204,
    });
  }
  static NO_CONTENT(): HttpResponse<void> {
    return new HttpResponse<void>({
      content: null,
      httpStatusCode: 204,
    });
  }

  static UNAUTHORIZAED(message: string | object, reference?: string) {
    return new HttpResponse({
      httpStatusCode: 401,
      error: {
        message: message,
        errorReference: reference,
      },
    });
  }

  static BAD_REQUEST(message: string | object, reference?: string) {
    return new HttpResponse({
      httpStatusCode: 400,
      error: {
        message: message,
        errorReference: reference,
      },
    });
  }
  static NOT_FOUND(message: string | object, reference?: string) {
    return new HttpResponse({
      httpStatusCode: 404,
      error: {
        message: message,
        errorReference: reference,
      },
    });
  }
  static CONFLICT(message: string, reference?: string) {
    return new HttpResponse({
      httpStatusCode: 409,
      error: {
        message: message,
        errorReference: reference,
      },
    });
  }

  static INTERNAL_ERROR(message: string, reference?: string) {
    return new HttpResponse({
      httpStatusCode: 500,
      error: {
        message: message,
        errorReference: reference,
      },
    });
  }
}
