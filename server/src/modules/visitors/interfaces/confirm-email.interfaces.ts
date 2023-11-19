interface input {
  code: number;
  email: string;
}

interface output {
  success: boolean;
}

export namespace TConfirmEmailCode {
  export type Input = input;
  export type Output = output;
}
