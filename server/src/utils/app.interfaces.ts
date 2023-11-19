export interface IHttpResponse<Type> {
  httpStatusCode: number;
  error: boolean;
  message?: string | string[];
  errorId?: string;
  content?: Type;
}

export abstract class UseCase<Input = void, Output = void> {
  abstract perform(data: Input): Promise<Output>;
}
